'use client'
import { sendRequest } from "@/utils/api"
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Snackbar, Switch, TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from 'next/navigation'

interface IProps {
    open: boolean
    setOpen: (v: boolean) => void
}
const AddPlayList = (props: IProps) => {

    const { open, setOpen } = props
    const { data: session } = useSession();
    const router = useRouter()

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [title, setTitle] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const handleSubmit = async () => {
        if (!title.trim()) {
            setIsSuccess(false)
            setOpenSnackbar(true)
            return
        }

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
            method: "POST",
            body: {
                title,
                isPublic
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

            setIsSuccess(true)
            setOpenSnackbar(true)
            setOpen(false)
            setTitle('')
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
                <DialogTitle>Add new playlist: </DialogTitle>
                <DialogContent >
                    <TextField
                        label="Title"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            '& input:-webkit-autofill': {
                                WebkitTextFillColor: '#e5e7eb',
                                WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                transition: 'background-color 9999s ease-in-out 0s',
                                paddingLeft: '5px'
                            },
                        }}
                    />

                    <FormControlLabel
                        sx={{
                            marginTop: 3
                        }}
                        control={
                            <Switch
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                        }
                        label={isPublic ? "Public" : "Private"}
                    />
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
                        ? "Create new playlist successfully!"
                        : "You need to fill in the title."}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddPlayList