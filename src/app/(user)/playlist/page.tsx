import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import PlayListTrack from "@/components/playlist/playlist.track"
import { sendRequest } from "@/utils/api"
import Container from "@mui/material/Container"
import { getServerSession } from "next-auth"

const PlayListPage = async () => {

    const session = await getServerSession(authOptions)

    const playlists = await sendRequest<IBackendRes<IModelPaginate<IPlayList>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/by-user`,
        method: "POST",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['playlist-by-user'] }
        }
    })

    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
        method: "GET",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })

    return (
        <Container>
            <PlayListTrack
                playlists={playlists?.data?.result ?? []}
                tracks={tracks.data?.result ?? []}
            />
        </Container>
    )
}

export default PlayListPage