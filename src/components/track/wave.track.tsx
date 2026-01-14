'use client'
import { useWavesurfer } from "@/utils/customHook"
import { useSearchParams } from "next/navigation"
import { useRef, useMemo, useState, useEffect, useCallback } from "react"
import { WaveSurferOptions } from "wavesurfer.js"


const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const containerRef = useRef<HTMLDivElement>(null)

    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        return {
            waveColor: '#dcd0ce',
            progressColor: '#db3d0f',
            barWidth: 2,
            url: `/api?audio=${fileName}`,
        }
    }, [])

    const wavesurfer = useWavesurfer(containerRef, optionsMemo)

    useEffect(() => {
        if (!wavesurfer) return

        setIsPlaying(false)

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const onPlayClick = useCallback(() => {
        wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }, [wavesurfer])

    return (
        <div ref={containerRef}>
            Wave track
            <div>
                <button onClick={() => onPlayClick()}>
                    {isPlaying === true ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}

export default WaveTrack