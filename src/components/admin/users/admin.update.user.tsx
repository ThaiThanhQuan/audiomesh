'use client';

import { sendRequest } from "@/utils/api";
import { Alert, Button, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    openUpdateModal: boolean;
    setOpenUpdateModal: (open: boolean) => void;
    user: IUser | null;
}

const AdminUpdateUser = (props: IProps) => {
    const { openUpdateModal, setOpenUpdateModal, user } = props;
    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        name: user?.name,
        email: user?.email,
        age: user?.age,
        address: user?.address,
        gender: user?.gender,
        role: user?.role,
    });

    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                email: user.email || '',
                age: user.age || '',
                address: user.address || '',
                gender: user.gender || '',
                role: user.role || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);

        const updateUser = await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
            body: {
                _id: user?._id,
                name: form.name,
                email: form.email,
                age: form.age,
                address: form.address,
                gender: form.gender,
                role: form.role,
            }
        });

        if (updateUser && updateUser.data) {
            setOpenUpdateModal(false);
            setOpenSuccess(true);
            setForm({
                name: '',
                email: '',
                age: '',
                address: '',
                gender: '',
                role: '',
            });
            router.refresh();
        };
    };

    const gender = [{
        label: 'MALE',
        value: 'MALE'
    }, {
        label: 'FEMALE',
        value: 'FEMALE'
    }];

    const role = [{
        label: 'USER',
        value: 'USER'
    }, {
        label: 'ADMIN',
        value: 'ADMIN'
    }];

    return (
        <>
            <Modal
                open={openUpdateModal}
                onClose={() => setOpenUpdateModal(false)}
                aria-labelledby="update-user-title"
            >
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography id="update-user-title" variant="h6" mb={2}>
                        Update User
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Name"
                            fullWidth
                            value={form.name}
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value })
                            }}
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        />

                        <TextField
                            required
                            label="Email"
                            fullWidth
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            disabled
                            fullWidth
                            value="********"
                            sx={{
                                '& .MuiInputBase-input.Mui-disabled': {
                                    WebkitTextFillColor: '#9ca3af',
                                    letterSpacing: '2px',
                                },
                            }}
                        />
                        <TextField
                            required
                            label="Age"
                            fullWidth
                            value={form.age}
                            onChange={(e) =>
                                setForm({ ...form, age: e.target.value })
                            }
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        />
                        <TextField
                            required
                            label="Address"
                            fullWidth
                            value={form.address}
                            onChange={(e) =>
                                setForm({ ...form, address: e.target.value })
                            }
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        />
                        <TextField
                            required
                            label="Gender"
                            fullWidth
                            value={form.gender}
                            select
                            onChange={(e) =>
                                setForm({ ...form, gender: e.target.value })
                            }
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        >
                            {gender.map((gender) => (
                                <MenuItem key={gender.value} value={gender.value}>
                                    {gender.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            required
                            label="Role"
                            fullWidth
                            value={form.role}
                            select
                            onChange={(e) =>
                                setForm({ ...form, role: e.target.value })
                            }
                            sx={{
                                '& .MuiInputLabel-asterisk': {
                                    color: '#ef4444',
                                },
                                '& input:-webkit-autofill': {
                                    WebkitTextFillColor: '#e5e7eb',
                                    WebkitBoxShadow: '0 0 0 1000px #111827 inset',
                                    transition: 'background-color 9999s ease-in-out 0s',
                                },
                            }}
                        >
                            {role.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                onClick={() => setOpenUpdateModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                onClose={() => setOpenSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSuccess(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Update user successfully!
                </Alert>
            </Snackbar>
        </>
    )
}

export default AdminUpdateUser;