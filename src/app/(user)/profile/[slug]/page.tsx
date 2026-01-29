import ProfileTrack from "@/components/header/profile.tracks"
import { sendRequest } from "@/utils/api"
import { Container } from "@mui/material"


const ProfilePage = async ({ params, searchParams }: {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        current?: string
    }>
}) => {

    const { slug } = await params
    const { current } = await searchParams
    const page = Number(current ?? 1)

    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: 'http://localhost:8000/api/v1/tracks/users',
        method: 'post',
        queryParams: {
            current: page,
            pageSize: 10,
        },
        body: { id: slug }
    })


    return (
        <Container sx={{ my: 5 }}>
            <ProfileTrack
                data={tracks.data?.result ?? []}
                meta={tracks.data!.meta}
            />
        </Container >


    )
}

export default ProfilePage