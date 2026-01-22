import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminUsers from "@/components/admin/users/admin.users";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth";

const AdminUsersPage = async ({
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

    const getUser = await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
        url: 'http://localhost:8000/api/v1/users',
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
        <AdminUsers
            users={getUser.data?.result ?? []}
            meta={getUser.data!.meta}
            access_token={session?.access_token ?? ''}
        />
    )
}

export default AdminUsersPage;