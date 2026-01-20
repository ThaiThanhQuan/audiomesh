'use client';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

const AuthSignIn = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');

    const handleSubmit = () => {
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

        console.log('username: ', username, 'password: ', password);
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Link href={'/'} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            textDecoration: 'none',
                            color: '#fff'
                        }}>
                            <img
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'contain',
                                    borderRadius: '6px',
                                }}
                                src="/soundcloudify_logo.png"
                                alt="SoundCloudify logo" />
                            <h3 style={{
                                margin: 0,
                                fontSize: 25,
                                fontWeight: 600
                            }}>SoundCloudify</h3>
                        </Link>
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
                        }}>Join the world of music with SoundCloudify.</p>
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
                            },

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2a2a2a',
                            },

                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1DB954',
                            },

                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1DB954',
                            },

                            '& .MuiInputLabel-root': {
                                color: '#b3b3b3',
                            },

                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#1DB954',
                            },
                        }} />
                    <TextField
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
                            },

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#2a2a2a',
                            },

                            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1DB954',
                            },

                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1DB954',
                            },

                            '& .MuiInputLabel-root': {
                                color: '#b3b3b3',
                            },

                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#1DB954',
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
        </Box >
    )
}

export default AuthSignIn;