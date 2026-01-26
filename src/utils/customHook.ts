import { useEffect, useState } from 'react';
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js"

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    return hasMounted;
}

export const useWavesurfer = (
    containerRef: React.RefObject<HTMLDivElement>,
    options: Omit<WaveSurferOptions, 'container'>
) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,

            renderFunction: (channels, ctx) => {
                const { width, height } = ctx.canvas
                const data = channels[0]

                const mid = height / 2
                const barWidth = 4
                const gap = 3
                const radius = barWidth / 2
                const step = Math.ceil(data.length / width)

                ctx.clearRect(0, 0, width, height)
                ctx.save()
                ctx.translate(0, mid)
                ctx.fillStyle = ctx.fillStyle

                let x = 0

                for (let i = 0; i < width; i += barWidth + gap) {
                    const index = i * step
                    const value = Math.abs(data[index] || 0)

                    // Smooth + nén amplitude → nhìn đắt
                    const h = Math.max(2, Math.pow(value, 0.6) * mid * 0.9)

                    ctx.beginPath()

                    // upper capsule
                    ctx.moveTo(x + radius, -h)
                    ctx.lineTo(x + barWidth - radius, -h)
                    ctx.quadraticCurveTo(x + barWidth, -h, x + barWidth, -h + radius)
                    ctx.lineTo(x + barWidth, -radius)
                    ctx.quadraticCurveTo(x + barWidth, 0, x + barWidth - radius, 0)
                    ctx.lineTo(x + radius, 0)
                    ctx.quadraticCurveTo(x, 0, x, -radius)
                    ctx.lineTo(x, -h + radius)
                    ctx.quadraticCurveTo(x, -h, x + radius, -h)

                    // lower capsule
                    ctx.moveTo(x + radius, h)
                    ctx.lineTo(x + barWidth - radius, h)
                    ctx.quadraticCurveTo(x + barWidth, h, x + barWidth, h - radius)
                    ctx.lineTo(x + barWidth, radius)
                    ctx.quadraticCurveTo(x + barWidth, 0, x + barWidth - radius, 0)
                    ctx.lineTo(x + radius, 0)
                    ctx.quadraticCurveTo(x, 0, x, radius)
                    ctx.lineTo(x, h - radius)
                    ctx.quadraticCurveTo(x, h, x + radius, h)

                    ctx.closePath()
                    ctx.fill()

                    x += barWidth + gap
                }

                ctx.restore()
            }


        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
    }, [containerRef, options])

    return wavesurfer
}