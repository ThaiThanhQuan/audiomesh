'use client'
import { useWavesurfer } from "@/utils/customHook"
import { useSearchParams } from "next/navigation"
import { useRef, useMemo, useState, useEffect, useCallback } from "react"
import { WaveSurferOptions } from "wavesurfer.js"
import './wave.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { Tooltip } from "@mui/material"
import { useTrackContext } from "@/lib/track.wrapper"
import { fetchDefaultImage } from "@/utils/api"
import CommentTrack from "./comment.track"
import LikeTrack from "./like.track"

interface IProps {
    track: ITrackTop | null
    comments: IComment[]
}
const WaveTrack = (props: IProps) => {
    const { track, comments } = props

    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [time, setTime] = useState<string>("0:00")
    const [duration, setDuration] = useState<string>("0:00")

    const containerRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef<HTMLDivElement>(null)
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!

            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            gradient.addColorStop(0, '#2A2E2B')
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#3A3F3C')
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#CDEED8')
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#E6F6EE')
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#9FD8B6')
            gradient.addColorStop(1, '#5E7F6E')

            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#1ED760')
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#1DB954')
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#DFF8EA')
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#F1FFF8')
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#8EE6B1')
            progressGradient.addColorStop(1, '#1AAE55')
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        }
    }, [])

    const wavesurfer = useWavesurfer(containerRef, optionsMemo)

    useEffect(() => {
        if (!wavesurfer) return

        setIsPlaying(false)

        const hover = hoverRef.current!
        const waveform = containerRef.current!
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration: number) => {
                setDuration(formatTime(duration))
            }),
            wavesurfer.on('timeupdate', (currentTime: number) => {
                setTime(formatTime(currentTime))
            }),
            wavesurfer.on('click', () => {
                wavesurfer.play()
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const onPlayClick = useCallback(() => {
        wavesurfer?.isPlaying() ? wavesurfer?.pause() : wavesurfer?.play();
    }, [wavesurfer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const calLeft = (moment: number) => {
        const hardCodedDuration = wavesurfer?.getDuration() ?? 0
        const percent = (moment / hardCodedDuration) * 100
        return `${percent}%`
    }

    useEffect(() => {
        if (wavesurfer && currentTrack.isPlaying) {
            wavesurfer.pause()
        }
    }, [currentTrack])

    useEffect(() => {
        if (track?._id && !currentTrack._id) {
            setCurrentTrack({ ...track, isPlaying: false })
        }
    }, [track])

    return (
        <>
            <div className="container">
                <div className="song">
                    <div className="song-control">
                        <div className="song-btn"
                            onClick={() => {
                                onPlayClick()
                                if (track && wavesurfer) {
                                    setCurrentTrack({ ...currentTrack, isPlaying: false })
                                }
                            }}
                        >
                            {isPlaying === true ? <PauseCircleIcon className="icon" /> : <PlayCircleIcon className="icon" />}
                        </div>
                        <div className="song-info">
                            <h1 className="song-name">{track?.title}</h1>
                            <h4 className="song-author">{track?.description} </h4>
                        </div>
                    </div>

                    <div className="audio">
                        <div ref={containerRef} className="waveform">
                            <div className="time">{time}</div>
                            <div className="duration">{duration}</div>
                            <div className="hover-wave" ref={hoverRef}></div>
                            <div className="overlay"></div>

                            <div className="comments" style={{ position: 'relative' }}>
                                {comments.map((comment) => {
                                    return (
                                        <Tooltip
                                            title={comment.content} key={comment._id}
                                            slotProps={{
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                                        color: '#fff',
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                    },
                                                }, popper: {
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, -10],
                                                            },
                                                        },
                                                    ],
                                                },
                                            }}
                                        >
                                            <img
                                                onPointerMove={(e) => {
                                                    const hover = hoverRef.current!
                                                    hover.style.width = calLeft(comment.moment + 3)
                                                }}
                                                key={comment._id}
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    position: "absolute",
                                                    top: 70,
                                                    zIndex: 10,
                                                    left: calLeft(comment.moment)
                                                }} src={fetchDefaultImage(comment.user.type)} />
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="song-img">
                    {
                        track?.imgUrl ?
                            <img className="image" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`} alt="song-img" /> :
                            <div className="song-img-default"></div>
                    }
                </div>
            </div >

            <LikeTrack
                track={track}
            />

            <CommentTrack
                track={track}
                comment={comments}
                wavesurfer={wavesurfer}
            />
        </>
    )
}

export default WaveTrack