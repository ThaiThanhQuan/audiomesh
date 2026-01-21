'use client';

import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';

const stats = [
    { label: 'Users', value: '1,240' },
    { label: 'Tracks', value: '320' },
    { label: 'Plays', value: '98,000' },
];

const topTracks = [
    { name: 'Blinding Lights', artist: 'The Weeknd', plays: 12000 },
    { name: 'Shape of You', artist: 'Ed Sheeran', plays: 9800 },
    { name: 'Stay', artist: 'Justin Bieber', plays: 8700 },
];

export default function AdminHomePage() {
    return (
        <Box
            sx={{
                maxWidth: 900,
                mx: 'auto', // căn giữa
            }}
        >
            {/* Title */}
            <Typography variant="h6" fontWeight={600} mb={3}>
                Admin Dashboard
            </Typography>

            {/* Stats */}
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

            {/* Top tracks */}
            <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
                Top Tracks
            </Typography>

            <Card sx={{ backgroundColor: '#181818' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#b3b3b3' }}>Track</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }}>Artist</TableCell>
                            <TableCell sx={{ color: '#b3b3b3' }} align="right">
                                Plays
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {topTracks.map((track) => (
                            <TableRow key={track.name}>
                                <TableCell sx={{ color: '#fff' }}>
                                    {track.name}
                                </TableCell>
                                <TableCell sx={{ color: '#b3b3b3' }}>
                                    {track.artist}
                                </TableCell>
                                <TableCell align="right" sx={{ color: '#1DB954' }}>
                                    {track.plays.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Box>
    );
}
