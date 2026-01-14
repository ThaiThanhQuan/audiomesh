'use client'

import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const { params } = props

    const search = searchParams.get('audio')
    return (
        <div>
            <h1>Track paddingLeft</h1>
            <WaveTrack />
        </div>
    )
}

export default DetailTrackPage