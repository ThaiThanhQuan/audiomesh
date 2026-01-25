'use client';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    AppBar,
    Toolbar,
    Button,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import Link from 'next/link';


interface IProps {
    users?: IPaginateMeta
    tracks?: IModelPaginate<ITrackTop>
}

export default function AdminHomePage(props: IProps) {
    const { users, tracks } = props

    const totalPlays =
        tracks?.result?.reduce((sum, track) => sum + track.countPlay, 0) ?? 0;

    const stats = [
        { label: 'Users', value: users?.total ?? 0 },
        { label: 'Tracks', value: tracks?.meta.total ?? 0 },
        { label: 'Plays', value: totalPlays },
    ];

    const labels = stats.map(item => item.label);
    const values = stats.map(item => item.value);

    return (
        <>
            <AppBar
                position="sticky"
                color="transparent"
                enableColorOnDark={false}
                sx={{
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    mb: 2
                }}
            >
                <Toolbar
                    sx={{
                        maxWidth: 1200,
                        width: '100%',
                        mx: 'auto',
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Admin Dashboard
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 4,
                        }}
                    >
                        <Button color="inherit" >
                            <Link
                                style={{ fontSize: 16, textDecoration: 'none', color: '#fff' }}
                                href={"/"}>
                                Home
                            </Link>
                        </Button>
                        <Button color="inherit" >
                            <Link
                                style={{ fontSize: 16, textDecoration: 'none', color: '#fff' }}
                                href={"/playlist"}>
                                Playlists
                            </Link>
                        </Button>
                        <Button color="inherit" >
                            <Link
                                style={{ fontSize: 16, textDecoration: 'none', color: '#fff' }}
                                href={"/like"}>
                                Like
                            </Link>
                        </Button>
                        <Button color="inherit" >
                            <Link
                                style={{ fontSize: 16, textDecoration: 'none', color: '#fff' }}
                                href={"/track/upload"}>
                                Upload
                            </Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    maxWidth: 900,
                    mx: 'auto',
                }}
            >
                <Stack direction="row" spacing={2} mb={4}>
                    {stats.map((item) => (
                        <Card key={item.label} sx={{ flex: 1, backgroundColor: '#181818' }}>
                            <CardContent>
                                <Typography variant="caption" color="#b3b3b3">
                                    {item.label}
                                </Typography>
                                <Typography variant="h5" fontWeight={600}>
                                    {item.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <BarChart
                    sx={{
                        ml: -4
                    }}
                    xAxis={[{
                        data: labels,
                    }]}
                    series={[
                        {
                            data: values,
                            color: '#34d399',
                        },
                    ]}
                    width={1000}
                    height={500}
                />
            </Box>
        </>

    );
}
