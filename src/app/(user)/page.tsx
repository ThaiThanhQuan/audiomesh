import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function Home() {
  const session = await getServerSession(authOptions)

  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'CHILL',
      limit: 100
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'PARTY',
      limit: 100
    }
  })

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'WORKOUT',
      limit: 100
    }
  })
  return (
    <Container>
      <MainSlider
        title={"More of what you like"}
        data={chill?.data ?? []}
      />
      <MainSlider
        title={"Made for you"}
        data={party?.data ?? []}
      />
      <MainSlider
        title={"Explore more genres of music"}
        data={workout?.data ?? []}
      />
    </Container>
  );
}
