'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Container } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {

    const hasMounted = useHasMounted();

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    console.log("currentTrack: ", currentTrack)

    if (!hasMounted) return (<></>)

    return (
        <div style={{
            marginTop: '100px'
        }}>
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
                <Container
                    sx={{
                        display: 'flex',
                        gap: 10,

                        '.rhap_main': {
                            gap: "30px"
                        }
                    }}>
                    <AudioPlayer
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/laviai-1769252586492.mp3`}
                        volume={1}
                        layout='horizontal-reverse'
                        style={{
                            boxShadow: 'unset',
                            backgroundColor: 'transparent',
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
        </div>
    )
}

export default AppFooter