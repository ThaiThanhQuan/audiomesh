import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import LikeTracks from "@/components/like/like.tracks"
import { sendRequest } from "@/utils/api"
import { Container } from "@mui/material"
import { getServerSession } from "next-auth"

const LikePage = async () => {
    const session = await getServerSession(authOptions)

    const likeTracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: "GET",
        queryParams: { current: 1, pageSize: 100 },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['liked-by-user'] }
        }
    })


    return (
        <Container>
            <LikeTracks likeTracks={likeTracks.data?.result ?? []} />
        </Container>
    )
}

export default LikePage