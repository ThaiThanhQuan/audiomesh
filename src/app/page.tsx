import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from '@/utils/old.api'
import { sendRequest } from "@/utils/api";
import { send } from "process";

export default async function Home() {

  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'CHILL',
      limit: 10
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'PARTY',
      limit: 10
    }
  })

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'post',
    body: {
      category: 'WORKOUT',
      limit: 10
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
