import WaveTrack from '@/components/track/wave.track'
import { sendRequest } from '@/utils/api'
import { Container } from '@mui/material'

const DetailTrackPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${slug}`,
        method: 'GET'
    })

    const comments = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: 'POST',
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: slug,
            sort: '-createdAt'
        }
    })

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