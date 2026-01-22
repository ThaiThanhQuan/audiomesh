'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Button,
    Box,
    Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AdminUpdateUser from './admin.update.user';

interface IProps {
    users: IUser[];
    meta: IPaginateMeta;
    access_token: string;
}
const AdminUsers = (props: IProps) => {
    const { users, meta, access_token } = props;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const [openUpdate, setOpenUpdate] = useState<boolean>(false);

    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            setSelectedUser(null);
            setOpenConfirm(false);
            setOpenSuccess(true);
            router.refresh();
        }
    };

    return (
        <>
            <Box component={"div"}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    mb: 2
                }}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                        Add new
                    </Button>
                </Box>
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 2,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                    }}
                >
                    <Table size="medium">
                        <TableHead sx={{ backgroundColor: '#181818' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>Role</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }} align='center'>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ backgroundColor: '#121212' }}>
                            {users.map((user) => (
                                <TableRow
                                    key={user._id}
                                    sx={{
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: '#1f1f1f',
                                        },
                                    }}
                                >

                                    <TableCell sx={{ color: '#e5e7eb' }}>{user.name || user.username}</TableCell>
                                    <TableCell sx={{ color: '#9ca3af' }}>{user.email}</TableCell>
                                    <TableCell sx={{ color: '#93c5fd' }}>{user.role}</TableCell>
                                    <TableCell align='center'>
                                        <EditIcon
                                            sx={{
                                                mr: 2,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.1)',
                                                },
                                                '&:active': {
                                                    transform: 'scale(0.95)',
                                                },
                                            }}
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenUpdate(true);
                                            }} />
                                        <DeleteIcon
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setOpenConfirm(true);
                                            }}
                                            sx={{
                                                color: '#f87171',
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer',
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
                </TableContainer >
                <TablePagination
                    component="div"
                    count={meta.total}
                    page={meta.current - 1}
                    rowsPerPage={meta.pageSize}
                    onPageChange={(_, newPage) => {
                        const params = new URLSearchParams(searchParams.toString());

                        params.set('current', String(newPage + 1));
                        router.push(`?${params.toString()}`);
                    }}
                    rowsPerPageOptions={[]}
                    sx={{
                        color: '#b3b3b3',
                        '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                            color: '#b3b3b3',
                        },
                    }}
                />
                <Snackbar
                    open={openConfirm}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    onClose={() => setOpenConfirm(false)}
                    message={
                        selectedUser
                            ? `Do you want to delete user ${selectedUser.name || selectedUser.username}?`
                            : ""
                    }
                    action={
                        <>
                            <Button
                                size="small"
                                color="inherit"
                                onClick={() => setOpenConfirm(false)}
                            >
                                No
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={() => {
                                    if (!selectedUser) return;
                                    handleDelete(selectedUser._id);
                                }}
                            >
                                Yes
                            </Button>
                        </>
                    }
                />

                <Snackbar
                    open={openSuccess}
                    autoHideDuration={3000}
                    onClose={() => setOpenSuccess(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={() => setOpenSuccess(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Delete user successfully!
                    </Alert>
                </Snackbar>
            </Box>

            <AdminUpdateUser
                open={openUpdate}
                setOpenUpdate={setOpenUpdate}
                user={selectedUser}
            />
        </>
    );
}

export default AdminUsers;