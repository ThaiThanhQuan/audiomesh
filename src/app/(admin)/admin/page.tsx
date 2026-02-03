import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AdminHomePage from "@/components/admin/admin.home";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{
    current?: string;
    pageSize?: string;
  }>;
}) => {

  const resolvedSearchParams = await searchParams;

  const session = await getServerSession(authOptions)

  const current = Number(resolvedSearchParams.current ?? 1);
  const pageSize = Number(resolvedSearchParams.pageSize ?? 8);

  const getTrack = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
    method: 'GET',
    queryParams: {
      current,
      pageSize
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  const getUser = await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
    method: 'GET',
    queryParams: {
      current,
      pageSize
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  return (
    <>
      <AdminHomePage
        users={getUser.data?.meta}
        tracks={getTrack.data}
      />
    </>
  )
}

export default Home