'use client'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from '@/lib/track.wrapper';

interface IProps {
    data: ITrackTop
}

const ProfileTrack = (props: IProps) => {
    const { data } = props
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    return (
        <Card sx={{ display: 'flex', position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {data.title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {data.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        <SkipPreviousIcon />
                    </IconButton>
                    <IconButton
                        aria-label="play/pause"
                        onClick={() => setCurrentTrack({ ...data, isPlaying: false })}
                    >
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        <SkipNextIcon />
                    </IconButton>
                </Box>
            </Box>


            <CardMedia
                component="img"
                sx={{
                    width: 151,
                    height: 154,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0
                }}
                image={`http://localhost:8000/images/${data.imgUrl}`}
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default ProfileTrack