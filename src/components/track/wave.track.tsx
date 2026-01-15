'use client'
import { useWavesurfer } from "@/utils/customHook"
import { useSearchParams } from "next/navigation"
import { useRef, useMemo, useState, useEffect, useCallback } from "react"
import { WaveSurferOptions } from "wavesurfer.js"
import './wave.scss'

const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [time, setTime] = useState<string>("0:00")
    const [duration, setDuration] = useState<string>("0:00")

    const containerRef = useRef<HTMLDivElement>(null)
    const hoverRef = useRef<HTMLDivElement>(null)

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!

            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            gradient.addColorStop(0, '#656666')
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666')
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff')
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff')
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1')
            gradient.addColorStop(1, '#B1B1B1')

            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#EE772F')
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926')
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff')
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff')
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094')
            progressGradient.addColorStop(1, '#F6B094')
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 150,
            barWidth: 2,
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
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const onPlayClick = useCallback(() => {
        wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }, [wavesurfer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }


    return (
        <div style={{ marginTop: 100 }}>
            <div ref={containerRef} className="waveform">
                <div className="time">{time}</div>
                <div className="duration">{duration}</div>
                <div className="hover-wave" ref={hoverRef}></div>
            </div>

            <div>
                <button onClick={() => onPlayClick()}>
                    {isPlaying === true ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}

export default WaveTrack