import { fetchDefaultImage } from "@/utils/api"
import { Grid, TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.locale('en')

interface IProps {
    track: ITrackTop | null
    comment: IComment[]
}
const CommentTrack = (props: IProps) => {
    const { track, comment } = props
    const { data: session } = useSession();

    console.log('comment:', comment)
    console.log('track:', track)
    return (
        <>
            <TextField
                fullWidth
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
            />

            <Grid
                container
                spacing={2}
                mt={5}
            >
                <Grid
                    size={{ xs: 2, xl: 3 }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    {session &&
                        <img
                            src={fetchDefaultImage(session?.user.type)}
                            alt="Image"
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: '50%',
                                border: '3px solid #1db954',
                            }}
                        />
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
                    size={{ xs: 10, xl: 9 }}
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
                                <img
                                    src={fetchDefaultImage(comment.user.type)}
                                    alt="Avatar"
                                    style={{
                                        width: 35,
                                        height: 35,
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
                                {dayjs(comment.createdAt).fromNow()}
                            </div>
                        </div>
                    ))) : <p style={{ color: '#888' }}>No comments yet</p>}
                </Grid>
            </Grid>
        </>
    )
}

export default CommentTrack