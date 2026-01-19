'use client';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import Link from "next/link";
import "./signin.scss";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="signin-page">
            <Grid container spacing={2} sx={{
                width: '100%',
            }}>
                <Grid
                    container
                    size={5}
                    direction="column"
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: '50px',
                    }}>
                    <div className="signin-header">
                        <div className="signin-brand">
                            <img
                                className="signin-logo"
                                src="/Spotify_icon.svg.png"
                                alt="SoundCloudify logo" />
                            <h3 className="signin-brand-name">SoundCloudify</h3>
                        </div>
                        <h1 className="signin-title">Sign In</h1>
                        <p className="signin-subtitle">Join the world of music with SoundCloudify.</p>
                    </div>

                    {/* <FormControl> */}
                    <TextField label="Username" variant="outlined" sx={{
                        width: '400px',
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
                        type={showPassword ? 'text' : 'password'}
                        sx={{
                            width: '400px',
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
                        sx={{
                            width: '400px',
                            height: '48px',
                            borderColor: '#1DB954',
                            backgroundColor: '#12ae4d',
                            color: '#fff',

                            '&:hover': {
                                backgroundColor: '#1ed760', // xanh sáng hơn
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <p> Or sign in with </p>

                    <div className="signin-social">
                        <GitHubIcon sx={{ fontSize: 35, cursor: 'pointer' }} />
                        <GoogleIcon sx={{ fontSize: 35, cursor: 'pointer' }} />
                    </div>
                    <p className="signin-footer">Don't have an account yet? <Link href="#">Sign Up</Link></p>
                </Grid>

                <Grid size={7} className="logo-image">
                    <img src="/listenmusic.png" alt="" />
                </Grid>
            </Grid>
        </div >
    )

}
export default SignIn;