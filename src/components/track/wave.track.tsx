'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, useMemo } from "react"
import WaveSurfer from "wavesurfer.js"

const useWavesurfer = (containerRef: any, options: any) => {
    const [wavesurfer, setWavesurfer] = useState<any>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
    }, [containerRef, options])

    return wavesurfer
}


const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')

    const containerRef = useRef<HTMLDivElement>(null)

    const optionsMemo = useMemo(() => {
        return {
            waveColor: '#dcd0ce',
            progressColor: '#db3d0f',
            url: `/api?audio=${fileName}`,
        }
    }, [])

    const wavesurfer = useWavesurfer(containerRef, optionsMemo)

    return (
        <div ref={containerRef}>Wave track</div>
    )
}

export default WaveTrack