import { sendRequest } from "@/utils/api"
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Snackbar } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface IProps {
    open: boolean
    setOpen: (v: boolean) => void
    playlists: IPlayList[]
    tracks: ITrackTop[]
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const AddTrack = (props: IProps) => {

    const { open, setOpen, playlists, tracks } = props
    const router = useRouter()
    const { data: session } = useSession();

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [chosenPlaylist, setChosenPlaylist] = useState<{
        _id: string
        title: string
        isPublic: boolean
    } | null>(null)

    const [playlistId, setPlaylistId] = useState<string>('')

    const [selectTrack, setSelectTrack] = React.useState<string[]>([]);

    const handleChangeTrack = (event: SelectChangeEvent<typeof selectTrack>) => {
        const {
            target: { value },
        } = event;
        setSelectTrack(
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    const handleChosePlaylist = (e: SelectChangeEvent) => {
        const id = e.target.value
        setPlaylistId(id)

        const selected = playlists.find(p => p._id === id)
        if (selected) {
            setChosenPlaylist({
                _id: selected._id,
                title: selected.title,
                isPublic: selected.isPublic,
            })
        }
    }

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists`,
            method: "PATCH",
            body: {
                "id": chosenPlaylist?._id,
                "title": chosenPlaylist?.title,
                "isPublic": chosenPlaylist?.isPublic,
                "tracks": selectTrack
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (res && res.data) {
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: 'POST',
                queryParams: {
                    tag: 'playlist-by-user',
                    secret: 'justASecretForJWT'
                }
            })

            setPlaylistId('')
            setChosenPlaylist(null)
            setSelectTrack([])
            setIsSuccess(true)
            setOpenSnackbar(true)
            setOpen(false)
            router.refresh()
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return
                    if (reason === 'escapeKeyDown') return
                    setOpen(false)
                }}
                fullWidth

            >
                <DialogTitle>Add track to playlist: </DialogTitle>
                <DialogContent >
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Select playlist</InputLabel>
                        <Select
                            value={playlistId}
                            onChange={handleChosePlaylist}
                            label="Select playlist"
                        >
                            <MenuItem value="">
                                <em>Choose playlist</em>
                            </MenuItem>

                            {playlists.map((playlist) => (
                                <MenuItem key={playlist._id} value={playlist._id}>
                                    {playlist.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <FormControl fullWidth
                        sx={{
                            marginTop: '30px'
                        }}>
                        <InputLabel id="demo-multiple-chip-label">Track</InputLabel>
                        <Select
                            multiple
                            value={selectTrack}
                            onChange={handleChangeTrack}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((id) => {
                                        const track = tracks.find(t => t._id === id)
                                        return (
                                            <Chip
                                                key={id}
                                                label={track?.title || id}
                                            />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {tracks.map((track) => (
                                <MenuItem
                                    key={track._id}
                                    value={track._id}
                                >
                                    {track.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleSubmit()}
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={isSuccess ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {isSuccess
                        ? "Update playlist successfully!"
                        : "You need to select the playlist and the songs."}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTrack