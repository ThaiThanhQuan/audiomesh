'use client';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Box, Button, Grid, IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import Image from "next/image";

const AuthSignIn = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>('');

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername('');
        setErrorPassword('');

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername('Username is not empty');
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword('Password is not empty');
            return;
        }

        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });

        if (!res?.error) {
            router.push('/');
        } else {
            setOpenMessage(true);
            setResMessage(res.error);
        }
    }

    return (
        <Box className="signin-page"
            sx={{
                background: 'linear-gradient(180deg, #121212 0%, #0e0e0e 100%)',
                color: '#fff',
                height: '100vh',
            }}
        >
            <Grid
                container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: '100px'
                }}>
                <Grid
                    size={{ xs: 10, sm: 8, md: 5, lg: 4 }}
                >
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Link
                                href="/"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    color: '#fff',
                                }}
                            >
                                <ArrowBackIcon sx={{ fontSize: 40 }} />
                            </Link>

                            <Link
                                href="/"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: '#fff',
                                }}>
                                <Image
                                    width={50}
                                    height={50}
                                    style={{
                                        objectFit: 'contain',
                                        borderRadius: '6px',
                                    }}
                                    src="/audiomesh.png"
                                    alt="Audiomesh logo" />
                                <h3 style={{
                                    margin: 0,
                                    fontSize: 25,
                                    fontWeight: 600
                                }}>Audiomesh</h3>

                            </Link>
                        </div>

                        <h1 style={{
                            margin: '15px 0',
                            fontSize: 32,
                            fontWeight: 700,
                            letterSpacing: '-0.5px'
                        }}>Sign In</h1>
                        <p style={{
                            margin: 0,
                            fontSize: 14,
                            color: '#b3b3b3'
                        }}>Join the world of music with Audiomesh.</p>
                    </div>

                    {/* <FormControl> */}
                    <TextField
                        label="Username"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={isErrorUsername}
                        helperText={errorUsername}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#181818',
                                color: '#ffffff',
                                borderRadius: '6px',

                                '& fieldset': {
                                    borderColor: '#2a2a2a',
                                },

                                '&:hover fieldset': {
                                    borderColor: '#1DB954',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: '#1DB954',
                                },
                            },

                            '& .MuiInputLabel-root': {
                                color: '#b3b3b3',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#1DB954',
                            },

                            '& input': {
                                color: '#ffffff',
                            },

                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #181818 inset',
                                WebkitTextFillColor: '#ffffff',
                                caretColor: '#ffffff',
                                transition: 'background-color 9999s ease-in-out 0s',
                            },
                        }} />
                    <TextField
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit()
                            }
                        }}
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={isErrorPassword}
                        helperText={errorPassword}
                        type={showPassword ? 'text' : 'password'}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#181818',
                                color: '#ffffff',
                                borderRadius: '6px',

                                '& fieldset': {
                                    borderColor: '#2a2a2a',
                                },

                                '&:hover fieldset': {
                                    borderColor: '#1DB954',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: '#1DB954',
                                },
                            },

                            '& .MuiInputLabel-root': {
                                color: '#b3b3b3',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#1DB954',
                            },

                            '& input': {
                                color: '#ffffff',
                            },

                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: '0 0 0 1000px #181818 inset',
                                WebkitTextFillColor: '#ffffff',
                                caretColor: '#ffffff',
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
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        onClick={handleSubmit}
                        sx={{
                            my: 3,
                            py: 1.5,
                            borderColor: '#1DB954',
                            backgroundColor: '#12ae4d',
                            color: '#fff',
                            borderRadius: 5,
                            transition: 'all 0.3s ease',

                            '&:hover': {
                                backgroundColor: '#1ed760',
                                borderRadius: 5,
                                transform: 'scale(1.03)',
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <p> Or sign in with </p>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 16
                        }}>
                            <GitHubIcon onClick={() => signIn('github')} sx={{ fontSize: 35, cursor: 'pointer' }} titleAccess="Login with Github" />
                            <GoogleIcon sx={{ fontSize: 35, cursor: 'pointer' }} titleAccess="Login with Google" />
                        </div>
                        <p style={{
                            fontSize: 14,
                            color: '#b3b3b3'
                        }}>Don't have an account yet?
                            <Link style={{
                                color: '#1DB954',
                                textDecoration: 'none',
                                fontWeight: 500,
                                marginLeft: 4
                            }} href="#">Sign Up</Link></p>
                    </div>
                </Grid>
            </Grid>

            <Snackbar
                open={openMessage}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOpenMessage(false)}
                message="Note archived"
            >

                <Alert
                    variant="filled"
                    severity="error"
                    onClose={() => setOpenMessage(false)}
                >
                    {resMessage}
                </Alert>
            </Snackbar>
        </Box >
    )
}

export default AuthSignIn;