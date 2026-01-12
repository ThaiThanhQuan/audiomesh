'use client'
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Container } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {

    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>)

    return (
        <AppBar
            position="fixed"
            sx={{
                top: 'auto',
                bottom: 0,
                backgroundColor: '#303030',

                '& .rhap_time': {
                    color: '#fff',
                },

                '& .rhap_button-clear': {
                    color: '#fff',
                },
            }}
        >
            <Container sx={{ display: 'flex', gap: 10 }}>
                <AudioPlayer
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                    volume={1}
                    style={{
                        boxShadow: 'unset',
                        backgroundColor: '#303030',
                    }}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    minWidth: 100
                }}>
                    <span style={{ color: '#999', fontSize: 12 }}>QUANTHAI</span>
                    <span style={{
                        color: '#fff',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 250,
                    }}>Ngày buồn tháng nhớ năm thương</span>
                </div>
            </Container>
        </AppBar >
    )
}

export default AppFooter