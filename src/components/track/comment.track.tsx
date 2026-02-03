import { fetchDefaultImage, sendRequest } from "@/utils/api"
import { Box, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { useState } from "react"
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation"
import WaveSurfer from 'wavesurfer.js'
import { useHasMounted } from "@/utils/customHook"
import Image from "next/image"

dayjs.extend(relativeTime)
dayjs.locale('en')

interface IProps {
    track: ITrackTop | null
    comment: IComment[]
    wavesurfer: WaveSurfer | null
}
const CommentTrack = (props: IProps) => {
    const { track, comment, wavesurfer } = props
    const { data: session } = useSession();
    const router = useRouter()
    const hasMounted = useHasMounted();

    const [yourComment, setYourComment] = useState('')

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<IComment>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
            method: 'post',
            body: {
                content: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })

        if (res.data) {
            router.refresh()
            setYourComment('')
        }
    }

    const handleJumpTrack = (moment: number) => {
        if (wavesurfer) {
            const duration = wavesurfer.getDuration()
            wavesurfer.seekTo(moment / duration)
            wavesurfer.play()
        }
    }

    return (
        <>
            <TextField
                fullWidth
                value={yourComment}
                onChange={(e) => setYourComment(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSubmit()
                    }
                }
                }
                label="Comments"
                variant="standard"
                sx={{
                    mt: 2,

                    '& input:-webkit-autofill': {
                        WebkitTextFillColor: '#e5e7eb',
                        WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                        transition: 'background-color 9999s ease-in-out 0s',
                        pl: '2px'
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => handleSubmit()}
                                    disabled={!yourComment.trim()}
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Grid
                container
                spacing={2}
                mt={5}
            >
                <Grid
                    size={{ xs: 12, sm: 3 }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {session &&
                        <Box
                            sx={{
                                width: { xs: 100, md: 150 },
                                height: { xs: 100, md: 150 },
                                position: 'relative',
                            }}
                        >
                            <Image
                                src={fetchDefaultImage(session?.user.type)}
                                alt="user comment"
                                fill
                                style={{
                                    borderRadius: '50%',
                                    border: '3px solid #1db954',
                                }}
                            />
                        </Box>

                    }
                    <p
                        style={{
                            margin: 0,
                            marginTop: 8,
                            color: '#b3b3b3',
                            fontSize: 14,
                        }}
                    >{session?.user.email}
                    </p>
                </Grid>

                <Grid
                    size={{ xs: 12, sm: 9 }}
                    sx={{
                        backgroundColor: '#1e1e1e',
                        borderRadius: 3,
                        padding: 2.5,
                    }}
                >
                    {comment && comment.length > 0 ? (comment.map((comment) => (
                        <div
                            key={comment._id}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginBottom: 20,
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    src={fetchDefaultImage(comment.user.type)}
                                    alt="comment"
                                    width={35}
                                    height={35}
                                    style={{
                                        borderRadius: '50%',
                                    }}
                                />
                                <div
                                    style={{ paddingLeft: '20px' }}
                                >
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: 15,
                                            fontWeight: 500,
                                            color: '#fff',
                                        }}
                                    >
                                        {comment.user.name}
                                        <span
                                            onClick={() => handleJumpTrack(comment.moment)}
                                            style={{
                                                marginLeft: 8,
                                                fontSize: 15,
                                                fontWeight: 400,
                                                color: '#9ca3af',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            at  {formatTime(comment.moment)}
                                        </span>
                                    </p>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: 14,
                                            color: '#b3b3b3',
                                        }}
                                    >
                                        {comment.content}
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    margin: 0,
                                    fontSize: 14,
                                    color: '#888',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {hasMounted && dayjs(comment.createdAt).fromNow()}
                            </div>
                        </div>
                    ))) : <p style={{ color: '#888' }}>No comments yet</p>}
                </Grid>
            </Grid>
        </>
    )
}

export default CommentTrack