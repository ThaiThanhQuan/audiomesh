import ProfileTrack from "@/components/header/profile.tracks"
import { sendRequest } from "@/utils/api"
import { Container, Grid } from "@mui/material"

const ProfilePage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params

    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: 'http://localhost:8000/api/v1/tracks/users?current=2&pageSize=20',
        method: 'post',
        body: { id: slug }
    })

    const data = tracks.data?.result ?? []

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={5}>
                {data.map((item, index) => {
                    return (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                            <ProfileTrack data={item} />
                        </Grid>
                    )
                })}
            </Grid>

        </Container >


    )
}

export default ProfilePage