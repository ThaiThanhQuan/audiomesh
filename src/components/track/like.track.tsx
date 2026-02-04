import { Chip } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

interface IProps {
    track: ITrackTop | null
}
const LikeTrack = (props: IProps) => {
    const { track } = props
    const { data: session } = useSession()
    const router = useRouter()

    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null)

    const isLike = trackLikes?.some(t => t._id === track?._id)
    const fetchData = async () => {
        if (session?.access_token) {
            const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                method: 'GET',
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: '-createdAt'
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })

            if (res1.data?.result) {
                setTrackLikes(res1.data.result)
            }
        }
    }
    useEffect(() => {
        fetchData()
    }, [session])

    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
            method: 'POST',
            body: {
                track: track?._id,
                quantity: isLike ? -1 : 1,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        })

        fetchData()

        await sendRequest<IBackendRes<any>>({
            url: `/api/revalidate`,
            method: 'POST',
            queryParams: {
                tag: ['track-by-id', 'liked-by-user'],
                secret: 'justASecretForJWT'
            }
        })
        router.refresh()
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px'
            }}
        >
            <Chip
                onClick={() => handleLikeTrack()}
                icon={<FavoriteIcon />}
                label="Like"
                variant="outlined"
                sx={{
                    borderColor: '#2a2a2a',
                    fontSize: 14,
                    cursor: 'pointer',
                    color: isLike ? '#e0245e' : '#b3b3b3',
                    '& .MuiChip-icon': {
                        color: isLike ? '#e0245e' : '#b3b3b3',
                    },

                    '&:hover': {
                        '& .MuiChip-icon': {
                            color: '#e0245e',
                        }
                    }
                }}
            />

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 28,
                }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <PlayArrowIcon fontSize="medium" style={{ color: '#b3b3b3' }} />
                    <p>{track?.countPlay}</p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3
                }}>
                    <FavoriteIcon fontSize="small" style={{ color: '#b3b3b3' }} />
                    <p>{track?.countLike}</p>
                </div>
            </div>
        </div >
    )
}

export default LikeTrack