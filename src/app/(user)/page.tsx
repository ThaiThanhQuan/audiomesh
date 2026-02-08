export const dynamic = 'force-dynamic'
import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";

export default async function Home() {
  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'post',
    body: {
      category: 'CHILL',
      limit: 100
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'post',
    body: {
      category: 'PARTY',
      limit: 100
    }
  })

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
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
