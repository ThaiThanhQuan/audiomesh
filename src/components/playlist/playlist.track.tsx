'use client'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    IconButton,
    Typography
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useState } from "react"
import AddPlayList from "./add.playlist"
import AddTrack from "./add.track"
import Link from "next/link"
import { convertSlugUrl, sendRequest } from "@/utils/api"
import { useTrackContext } from "@/lib/track.wrapper"
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


interface IProps {
    playlists: IPlayList[]
    tracks: ITrackTop[]
}

const PlayListTrack = ({ playlists, tracks }: IProps) => {
    const [openPlayList, setOpenPlayList] = useState(false)
    const [openTrack, setOpenTrack] = useState(false)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const { data: session } = useSession();
    const router = useRouter()

    const handleDeletePlayList = async (id: string) => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/${id}`,
            method: 'DELETE',
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
            router.refresh()
        }
    }


    return (
        <div
            style={{
                marginTop: 40,
                padding: 40,
                background: '#181818',
                borderRadius: 16,
                color: '#fff'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}
            >
                <h2 style={{ margin: 0 }}>My Playlists</h2>

                <div style={{ display: 'flex', gap: 12 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: '#1DB954',
                            color: '#000',
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: '#1ed760'
                            }
                        }}
                        onClick={() => setOpenPlayList(true)}
                    >
                        Playlist
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            borderColor: '#1DB954',
                            color: '#1DB954',
                            '&:hover': {
                                backgroundColor: 'rgba(29,185,84,0.1)'
                            }
                        }}
                        onClick={() => setOpenTrack(true)}
                    >
                        Track
                    </Button>
                </div>
            </div>

            <Divider sx={{ background: '#2a2a2a', mb: 2 }} />

            {/* Playlist list */}
            {playlists.map((playlist) => (
                <div
                    key={playlist._id}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <Accordion
                        key={playlist._id}
                        disableGutters
                        sx={{
                            flex: 1,
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
                            <Typography fontWeight={600}>
                                {playlist.title}
                            </Typography>
                        </AccordionSummary>

                        <Divider sx={{ background: '#2a2a2a' }} />

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
                                return (
                                    <AccordionDetails
                                        key={track._id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#282828'
                                            }
                                        }}
                                    >
                                        <Link
                                            href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                            style={{
                                                textDecoration: 'none',
                                                fontSize: 14,
                                                color: '#fff'
                                            }} >
                                            {track.title}
                                        </Link>

                                        {
                                            (track._id !== currentTrack._id || (track._id === currentTrack._id && currentTrack.isPlaying === false))
                                                ?
                                                <IconButton
                                                    aria-label="play/pause"
                                                    onClick={() => setCurrentTrack({ ...track, isPlaying: true })}
                                                >

                                                    <PlayArrowIcon sx={{ height: 30, width: 30, color: '#1DB954' }} />
                                                </IconButton> :

                                                <IconButton
                                                    aria-label="play/pause"
                                                    onClick={() => setCurrentTrack({ ...track, isPlaying: false })}
                                                >

                                                    <PauseIcon sx={{ height: 30, width: 30, color: '#1DB954' }} />
                                                </IconButton>
                                        }
                                    </AccordionDetails>
                                )
                            })
                        )}
                    </Accordion>

                    <DeleteIcon
                        onClick={() => handleDeletePlayList(playlist._id)}
                        sx={{
                            color: '#b3b3b3',
                            fontSize: 30,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: '#ff4d4f',
                                transform: 'scale(1.15)'
                            }
                        }}
                    />
                </div>
            ))
            }

            <AddPlayList open={openPlayList} setOpen={setOpenPlayList} />
            <AddTrack
                open={openTrack}
                setOpen={setOpenTrack}
                playlists={playlists ?? []}
                tracks={tracks ?? []}
            />
        </div >
    )
}

export default PlayListTrack
