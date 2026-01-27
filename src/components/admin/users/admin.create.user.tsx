'use client';

import { sendRequest } from "@/utils/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, IconButton, InputAdornment, MenuItem, Modal, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    openCreateModal: boolean;
    setOpenCreateModal: (open: boolean) => void;
}


const AdminCreateUser = (props: IProps) => {
    const { openCreateModal, setOpenCreateModal } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        address: '',
        gender: '',
        role: '',
    });

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);

        const createUser = await sendRequest<IBackendRes<IModelPaginate<IUser>>>({
            url: 'http://localhost:8000/api/v1/users',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
            body: {
                name: form.name,
                email: form.email,
                password: form.password,
                age: form.age,
                address: form.address,
                gender: form.gender,
                role: form.role,
            }
        });

        if (createUser && createUser.data) {
            setOpenCreateModal(false);
            setOpenSuccess(true);
            setForm({
                name: '',
                email: '',
                password: '',
                age: '',
                address: '',
                gender: '',
                role: '',
            });
            router.refresh();
        };
    };

    return (
        <>
            <Modal
                open={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                aria-labelledby="update-user-title"
            >
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Typography id="update-user-title" variant="h6" mb={2}>
                        Create User
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            required
                            label="Name"
                            fullWidth
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
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
                            label="Email"
                            fullWidth
                            autoComplete="username"
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
                            required
                            label="Password"
                            fullWidth
                            autoComplete="current-password"
                            value={form.password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
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
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
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
                                onClick={() => setOpenCreateModal(false)}
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
                    Create user successfully!
                </Alert>
            </Snackbar>
        </>
    )
}

export default AdminCreateUser;