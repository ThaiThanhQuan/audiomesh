'use client'

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    IconButton,
    Typography,
    Box,
    Snackbar
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import DeleteIcon from '@mui/icons-material/Delete'

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import AddPlayList from "./add.playlist"
import AddTrack from "./add.track"
import { convertSlugUrl, sendRequest } from "@/utils/api"
import { useTrackContext } from "@/lib/track.wrapper"

interface IProps {
    playlists: IPlayList[]
    tracks: ITrackTop[]
}

const PlayListTrack = ({ playlists, tracks }: IProps) => {
    const [openPlayList, setOpenPlayList] = useState(false)
    const [openTrack, setOpenTrack] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null)
    const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<string>("")

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const { data: session } = useSession()
    const router = useRouter()

    const handleConfirmDelete = async () => {
        if (!selectedPlaylistId) return

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/${selectedPlaylistId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (res?.data) {
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: 'POST',
                queryParams: {
                    tag: 'playlist-by-user',
                    secret: 'justASecretForJWT'
                }
            })
            setOpenConfirm(false)
            setSelectedPlaylistId(null)
            router.refresh()
        }
    }

    return (
        <Box
            sx={{
                mt: 4,
                p: { xs: 2, sm: 4 },
                backgroundColor: '#181818',
                borderRadius: 3,
                color: '#fff'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    My Playlists
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenPlayList(true)}
                        sx={{
                            backgroundColor: '#1DB954',
                            color: '#000',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#1ed760' }
                        }}
                    >
                        Playlist
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenTrack(true)}
                        sx={{
                            borderColor: '#1DB954',
                            color: '#1DB954',
                            '&:hover': {
                                backgroundColor: 'rgba(29,185,84,0.1)'
                            }
                        }}
                    >
                        Track
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ borderColor: '#2a2a2a', mb: 2 }} />

            {playlists.map((playlist) => (
                <Box
                    key={playlist._id}
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-start'
                    }}
                >
                    <Accordion
                        disableGutters
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            backgroundColor: '#181818',
                            color: '#fff',
                            borderRadius: 2,
                            mb: 1,
                            '&:before': { display: 'none' }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: '#b3b3b3' }} />}
                        >
                            <Typography
                                fontWeight={600}
                                noWrap
                            >
                                {playlist.title}
                            </Typography>
                        </AccordionSummary>

                        <Divider sx={{ borderColor: '#2a2a2a' }} />

                        {playlist.tracks.length === 0 ? (
                            <Typography
                                sx={{
                                    color: '#b3b3b3',
                                    textAlign: 'right',
                                    px: 2,
                                    py: 1,
                                    fontSize: 13
                                }}
                            >
                                Empty playlist
                            </Typography>
                        ) : (
                            playlist.tracks.map((track) => {
                                const isCurrent = track._id === currentTrack._id
                                const isPlaying = isCurrent && currentTrack.isPlaying

                                return (
                                    <AccordionDetails
                                        key={track._id}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 1,
                                            px: 1,
                                            '&:hover': {
                                                backgroundColor: '#282828'
                                            }
                                        }}
                                    >
                                        <Link
                                            href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                            style={{
                                                flex: 1,
                                                minWidth: 0,
                                                textDecoration: 'none',
                                                fontSize: 13,
                                                color: '#fff',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {track.title}
                                        </Link>

                                        <IconButton
                                            sx={{ p: 0.5 }}
                                            onClick={() =>
                                                setCurrentTrack({
                                                    ...track,
                                                    isPlaying: !isPlaying
                                                })
                                            }
                                        >
                                            {isPlaying ? (
                                                <PauseIcon sx={{ fontSize: 26, color: '#1DB954' }} />
                                            ) : (
                                                <PlayArrowIcon sx={{ fontSize: 26, color: '#1DB954' }} />
                                            )}
                                        </IconButton>
                                    </AccordionDetails>
                                )
                            })
                        )}
                    </Accordion>

                    <DeleteIcon
                        onClick={() => {
                            setSelectedPlaylistId(playlist._id)
                            setSelectedPlaylistTitle(playlist.title)
                            setOpenConfirm(true)
                        }
                        }
                        sx={{
                            mt: '6px',
                            fontSize: { xs: 22, sm: 28 },
                            color: '#b3b3b3',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: '#ff4d4f',
                                transform: 'scale(1.15)'
                            }
                        }}
                    />
                </Box>
            ))}

            <Snackbar
                open={openConfirm}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpenConfirm(false)}
                message={`Delete playlist "${selectedPlaylistTitle}"?`}
                action={
                    <>
                        <Button
                            size="small"
                            color="inherit"
                            onClick={() => setOpenConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            color="error"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </>
                }
            />


            <AddPlayList open={openPlayList} setOpen={setOpenPlayList} />
            <AddTrack
                open={openTrack}
                setOpen={setOpenTrack}
                playlists={playlists ?? []}
                tracks={tracks ?? []}
            />
        </Box>
    )
}

export default PlayListTrack
