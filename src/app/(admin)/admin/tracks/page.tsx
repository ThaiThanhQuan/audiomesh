import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AdminTracks from "@/components/admin/tracks/admin.tracks";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const AdminTracksPage = async ({
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

    const defaultMeta = {
        current: 1,
        pageSize: 8,
        pages: 0,
        total: 0,
    }

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

    return (
        <>
            <AdminTracks
                tracks={getTrack.data?.result ?? []}
                meta={getTrack.data?.meta ?? defaultMeta}
                access_token={session?.access_token ?? ''}
            />
        </>
    )
}

export default AdminTracksPage;