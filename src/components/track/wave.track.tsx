'use client'
import { useEffect, useRef } from "react"
import WaveSurfer from "wavesurfer.js"

const WaveTrack = () => {

    const containerRed = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRed.current) {
            WaveSurfer.create({
                container: containerRed.current,
                waveColor: '#dcd0ce',
                progressColor: '#db3d0f',
                url: '/audio/laviai.mp3',
            })
        }

    }, [])

    return (
        <div ref={containerRed}>Wave track</div>
    )
}

export default WaveTrack