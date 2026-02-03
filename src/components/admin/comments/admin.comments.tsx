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

interface IProps {
    comments: IComment[];
    meta: IPaginateMeta;
    access_token: string;
}
const AdminComments = (props: IProps) => {
    const { comments, meta, access_token } = props;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [selectedComment, setSelectedComment] = useState<IComment | null>(null);

    const handleDelete = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            setSelectedComment(null);
            setOpenConfirm(false);
            setOpenSuccess(true);
            router.refresh();
        }
    };

    return (
        <>
            <Box component={"div"}>
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: 2,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                        mt: 6.5
                    }}
                >
                    <Table size="medium">
                        <TableHead sx={{ backgroundColor: '#181818' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>STT</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>Content</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>Track</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }}>User</TableCell>
                                <TableCell sx={{ color: '#e5e7eb', fontSize: 16, fontWeight: 600 }} align='center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody sx={{ backgroundColor: '#121212' }}>
                            {comments.map((comment, index) => (
                                <TableRow
                                    key={comment._id}
                                    sx={{
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: '#1f1f1f',
                                        },
                                    }}
                                >

                                    <TableCell sx={{ color: '#e5e7eb' }}>{((meta.current - 1) * meta.pageSize) + index + 1}</TableCell>
                                    <TableCell sx={{ color: '#9ca3af' }}>{comment.content}</TableCell>
                                    <TableCell sx={{ color: '#93c5fd' }}>{comment.track.description}</TableCell>
                                    <TableCell sx={{ color: '#93c5fd' }}>{comment.user.name}</TableCell>
                                    <TableCell align='center'>
                                        <DeleteIcon
                                            onClick={() => {
                                                setSelectedComment(comment);
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
                        selectedComment
                            ? `Do you want to delete comment ${selectedComment.content}?`
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
                                    if (!selectedComment) return;
                                    handleDelete(selectedComment._id);
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
                        Delete comment successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default AdminComments;