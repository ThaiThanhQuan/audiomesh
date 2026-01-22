'use client';

import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
    open: boolean;
    setOpenUpdate: (open: boolean) => void;
    user: IUser | null;
}

const AdminUpdateUser = (props: IProps) => {
    const { open, setOpenUpdate, user } = props;

    const [form, setForm] = useState({
        name: user?.name,
        email: user?.email,
        password: user?.password,
        age: user?.age,
        address: user?.address,
        gender: user?.gender,
        role: user?.role,
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                email: user.email || '',
                password: user.password || '',
                age: user.age || '',
                address: user.address || '',
                gender: user.gender || '',
                role: user.role || '',
            });
        }
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        // call API PATCH here
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpenUpdate(false)}
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
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        sx={{
                            '& .MuiInputLabel-asterisk': {
                                color: '#ef4444',
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
                        }}
                    />
                    <TextField
                        required
                        label="Gender"
                        fullWidth
                        value={form.gender}
                        onChange={(e) =>
                            setForm({ ...form, gender: e.target.value })
                        }
                        sx={{
                            '& .MuiInputLabel-asterisk': {
                                color: '#ef4444',
                            },
                        }}
                    />

                    <TextField
                        required
                        label="Role"
                        fullWidth
                        value={form.role}
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                        }
                        sx={{
                            '& .MuiInputLabel-asterisk': {
                                color: '#ef4444',
                            },
                        }}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => setOpenUpdate(false)}
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
    )
}

export default AdminUpdateUser;