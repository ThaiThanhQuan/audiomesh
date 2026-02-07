'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import UploadIcon from '@mui/icons-material/Upload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react"
import { fetchDefaultImage } from '@/utils/api';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';
import ActiveLink from './active.link';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(3),
        display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
        display: 'block',
        width: '100%',
        marginLeft: theme.spacing(2),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function AppHeader() {
    const { data: session } = useSession()

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRedirectHome = () => {
        router.push('/')
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link
                    href={`/profile/${session?.user._id}`}
                    style={{
                        color: 'unset',
                        textDecoration: 'unset'
                    }}>
                    Profile
                </Link>
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(), signOut() }}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}

            sx={{
                "> a": {
                    color: 'unset',
                    textDecoration: 'unset'
                }
            }}
        >
            <MenuItem component={Link} href={`/`} onClick={handleMobileMenuClose}>
                <IconButton size='small'>
                    <HomeIcon />
                </IconButton>
                Home
            </MenuItem>
            <MenuItem component={Link} href={`/profile/${session?.user._id}`} onClick={handleMobileMenuClose}>
                <IconButton size='small'>
                    <AccountCircle />
                </IconButton>
                Profile
            </MenuItem>
            <MenuItem component={Link} href="/playlist" onClick={handleMobileMenuClose}>
                <IconButton size='small'>
                    <QueueMusicIcon />
                </IconButton>
                Playlist
            </MenuItem>
            <MenuItem component={Link} href="/like" onClick={handleMobileMenuClose}>
                <IconButton size='small'>
                    <FavoriteIcon />
                </IconButton>
                Likes
            </MenuItem>
            <MenuItem component={Link} href={'/track/upload'} onClick={handleMobileMenuClose}>
                <IconButton size='small'>
                    <UploadIcon />
                </IconButton>
                Upload
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(), signOut() }}>
                <IconButton size='small'>
                    <LogoutIcon />
                </IconButton>
                Logout
            </MenuItem>
        </Menu>
    )


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: 'rgb(18, 18, 18)' }}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                cursor: 'pointer'
                            }}
                            onClick={() => handleRedirectHome()}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Image
                                    src="/audiomesh_nocolor.png"
                                    alt="Audiomesh logo"
                                    width={50}
                                    height={50}
                                    style={{
                                        objectFit: 'contain',
                                        borderRadius: '6px',
                                    }}
                                />
                                <span>Audiomesh</span>
                            </div>
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyDown={(e: any) => {
                                    if (e.key === "Enter") {
                                        if (e?.target?.value)
                                            router.push(`/search?q=${e?.target?.value}`)
                                    }
                                }}
                            />

                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: '25px',
                            cursor: 'pointer',
                            "& a": {
                                color: '#b3bcc7',
                                textDecoration: 'none',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontWeight: 500,
                                transition: 'all 0.25s ease',

                                "&:hover": {
                                    backgroundColor: '#2a3441',
                                    color: '#e6faff'
                                }
                            },

                            "& a.active": {
                                background: 'linear-gradient(135deg, #2f3c4a, #394b5a)',
                                color: '#9ff3ff',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                            }
                        }}>
                            {session?.user?.role === "ADMIN" && <ActiveLink href={'/admin'}>Admin</ActiveLink>}
                            {session ? <>
                                <ActiveLink href={'/playlist'}>Playlists</ActiveLink>
                                <ActiveLink href={'/like'}>Likes</ActiveLink>
                                <ActiveLink href={'/track/upload'}>Upload</ActiveLink>

                                <Image
                                    onClick={handleProfileMenuOpen}
                                    src={fetchDefaultImage(session.user.type)}
                                    alt="user"
                                    width={40}
                                    height={40}
                                    style={{
                                        borderRadius: 100
                                    }}
                                />
                            </> :
                                <>
                                    <Link href={'/auth/signin'}>Login</Link>
                                </>
                            }
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            {session ? (
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            ) : (
                                <Link href="/auth/signin" style={{ color: 'white', textDecoration: 'none' }}>
                                    Login
                                </Link>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );
}
