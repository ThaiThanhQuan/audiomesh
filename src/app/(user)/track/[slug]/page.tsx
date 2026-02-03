import WaveTrack from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import { Container } from '@mui/material'

import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug

    const baseSlug = slug?.split('.html') ?? []
    const slugSegments = (baseSlug[0]?.split('-') ?? []) as string[]
    const id = slugSegments[slugSegments.length - 1]

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: 'GET',
    })

    return {
        title: res.data?.title,
        description: res.data?.description,
        openGraph: {
            title: res.data?.title,
            description: res.data?.description,
            type: 'website',
            images: [`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${res.data?.imgUrl}`],
        }
    }
}

const DetailTrackPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const baseSlug = slug?.split('.html') ?? []
    const slugSegments = (baseSlug[0]?.split('-') ?? []) as string[]
    const id = slugSegments[slugSegments.length - 1]

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: 'GET',
        nextOption: { cache: 'no-store' }
    })

    const comments = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: 'POST',
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: '-createdAt'
        }
    })

    if (!res.data) {
        notFound()
    }

    return (
        <Container>
            <WaveTrack
                track={res?.data ?? null}
                comments={comments?.data?.result ?? []}
            />
        </Container>
    )
}

export default DetailTrackPage