'use client'
import { useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';
import { AppBar, Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {

    const hasMounted = useHasMounted();
    const playerRef = useRef(null)

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    useEffect(() => {
        // @ts-ignore
        const audio = playerRef.current?.audio?.current;
        if (!audio) return;

        if (currentTrack?.isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [currentTrack]);

    if (!hasMounted) return (<></>)

    return (
        <>
            {currentTrack._id && <div style={{
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
                            ref={playerRef}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                            volume={1}
                            layout='horizontal-reverse'
                            style={{
                                boxShadow: 'unset',
                                backgroundColor: 'transparent',
                            }}
                            onPause={() => {
                                setCurrentTrack({ ...currentTrack, isPlaying: false })
                            }}
                            onPlay={() => {
                                setCurrentTrack({ ...currentTrack, isPlaying: true })
                            }}


                        />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignContent: 'center',
                            justifyContent: 'center',
                            minWidth: 100
                        }}>
                            <span
                                style={{
                                    color: '#999',
                                    fontSize: 15,
                                    maxWidth: 190,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                {currentTrack.description}
                            </span>
                            <span style={{
                                color: '#fff',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: 250,
                            }}>{currentTrack.title}</span>
                        </div>
                    </Container>
                </AppBar >
            </div>}
        </>
    )
}

export default AppFooter