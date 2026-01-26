import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminComments from "@/components/admin/comments/admin.comments";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const AdminCommentPage = async ({
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

    const getComment = await sendRequest<IBackendRes<IModelPaginate<IComment>>>({
        url: 'http://localhost:8000/api/v1/comments',
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
            <AdminComments
                comments={getComment.data?.result ?? []}
                meta={getComment.data!.meta}
                access_token={session?.access_token ?? ''}
            />
        </>
    )
}

export default AdminCommentPage;