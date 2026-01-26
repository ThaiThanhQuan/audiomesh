'use client'
import { Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CommentIcon from '@mui/icons-material/Comment';
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const AdminSidebar = () => {

    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { label: 'Home', icon: <HomeIcon />, path: '/admin' },
        { label: 'Users', icon: <PersonIcon />, path: '/admin/users' },
        { label: 'Tracks', icon: <MusicNoteIcon />, path: '/admin/tracks' },
        { label: 'Comments', icon: <CommentIcon />, path: '/admin/comments' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #181818 0%, #121212 100%)',
                    color: '#fff',
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Link href={'/'} style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#fff',
                }}>
                    <Box
                        component="img"
                        src="/soundcloudify_logo.png"
                        alt="SoundCloudify logo"
                        sx={{
                            width: 32,
                            height: 32,
                            objectFit: 'contain',
                        }}
                    />
                    <Typography fontWeight="bold">SoundCloudify</Typography>
                </Link>
                <Typography sx={{ paddingLeft: 1 }} variant="caption" color="gray">Music Player</Typography>
            </Box>

            <Divider />

            <List>
                {menuItems.map((item) => {
                    const isActive = pathname === item.path

                    return (
                        <ListItemButton
                            key={item.label}
                            selected={isActive}
                            onClick={() => router.push(item.path)}
                            sx={{
                                borderRadius: 1,
                                mx: 1,
                                color: isActive ? '#1DB954' : '#b3b3b3',
                                '&.Mui-selected': {
                                    backgroundColor: '#1DB95422',
                                },
                                '&:hover': {
                                    backgroundColor: '#1DB95411',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{ color: isActive ? '#1DB954' : '#b3b3b3' }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Drawer>
    )
}
export default AdminSidebar;