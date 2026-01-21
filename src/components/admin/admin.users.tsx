import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendRequest } from '@/utils/api';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { getServerSession } from 'next-auth';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';

const rows = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com', role: 'User' },
    { id: 2, name: 'Admin', email: 'admin@gmail.com', role: 'Admin' },
    { id: 3, name: 'Jane', email: 'jane@gmail.com', role: 'User' },
];

const AdminUsers = async () => {
    const session = await getServerSession(authOptions)


    const users = await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
        url: 'http://localhost:8000/api/v1/users',
        method: 'GET',
        queryParams: {
            current: 1,
            pageSize: 10,
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    });

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    backgroundColor: '#181818',
                }}
            >
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#b3b3b3' }}>Name</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>Email</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>Role</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }} align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users?.data?.result.map((user) => (
                            <TableRow
                                key={user._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#232323',
                                    },
                                }}
                            >

                                <TableCell>{user.name || user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell align='center'>
                                    <DeleteIcon sx={{
                                        color: '#f87171',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: '#ef4444',
                                            transform: 'scale(1.1)',
                                        },
                                        '&:active': {
                                            transform: 'scale(0.95)',
                                        },
                                    }} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                component="div"
                count={meta.total}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 20]}
                sx={{
                    color: '#b3b3b3',
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        color: '#b3b3b3',
                    },
                }}
            /> */}
        </>
    );
}

export default AdminUsers;