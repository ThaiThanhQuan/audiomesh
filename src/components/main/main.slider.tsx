'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTrackContext } from "@/lib/track.wrapper";

interface IProps {
    data: ITrackTop[]
    title: string
}
const iconStyle = (hovered: boolean) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: hovered
        ? 'translate(-50%, -50%) scale(1)'
        : 'translate(-50%, -50%) scale(0.7)',
    fontSize: 50,
    color: '#fff',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '50%',
    padding: 1,
    opacity: hovered ? 1 : 0.9,
    transition: 'all 0.25s ease',
});

const MainSlider = (props: IProps) => {
    const { data, title } = props
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    const PrevArrow = (props: any) => {
        return (
            <Button
                onClick={() => props.onClick()}
                sx={{
                    position: "absolute",
                    left: 8,
                    top: 100,
                    transform: "translateY(-50%)",
                    zIndex: 2,

                    width: 36,
                    height: 36,
                    minWidth: 36,

                    borderRadius: "50%",
                    backgroundColor: "rgba(30,30,30,0.85)",
                    color: "#fff",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    boxShadow: "0 2px 8px rgba(0,0,0,0.6)",

                    "&:hover": {
                        backgroundColor: "rgba(50,50,50,0.95)",
                    },
                }}
            >
                <ArrowBackIosIcon sx={{
                    fontSize: 22,
                    transform: "translateX(4px)",
                }} />
            </Button>
        )
    }

    const NextArrow = (props: any) => {
        return (
            <Button
                onClick={() => props.onClick()}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 100,
                    transform: "translateY(-50%)",
                    zIndex: 2,

                    width: 36,
                    height: 36,
                    minWidth: 36,

                    borderRadius: "50%",
                    backgroundColor: "rgba(30,30,30,0.85)",
                    color: "#fff",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    boxShadow: "0 2px 8px rgba(0,0,0,0.6)",

                    "&:hover": {
                        backgroundColor: "rgba(50,50,50,0.95)",
                    },
                }}
            >
                <ArrowForwardIosIcon sx={{
                    fontSize: 22,
                    transform: "translateX(1px)",
                }} />
            </Button>
        )
    }

    const settings: Settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };
    return (
        <>
            <Box sx={{
                mx: '50px',
                position: 'relative',

                '& .track': {
                    px: 1,
                },

                '& .track img': {
                    width: '100%',
                    borderRadius: '6px',
                },

                '& .track h3': {
                    margin: '0',
                    fontSize: '15px',
                    color: '#fff',
                },
            }}
            >
                <h2>{title}</h2>
                <Slider {...settings}>
                    {data.map(track => {
                        const isCurrent = currentTrack._id === track._id;
                        const isPlaying = isCurrent && currentTrack.isPlaying;
                        return (
                            <div className="track" key={track._id}>
                                <div
                                    onMouseEnter={() => setHoveredId(track._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => {
                                        setCurrentTrack({
                                            ...track,
                                            isPlaying: !isPlaying,
                                        });
                                    }}
                                    style={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                        style={{
                                            width: '100%',
                                            display: 'block',
                                            opacity: hoveredId === track._id ? 0.7 : 1,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                    />

                                    {(hoveredId === track._id || isPlaying) && (
                                        isPlaying ? (
                                            <PauseIcon sx={iconStyle(hoveredId === track._id)} />
                                        ) : (
                                            <PlayArrowIcon sx={iconStyle(hoveredId === track._id)} />
                                        )
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5
                                    }}
                                >
                                    <Link
                                        href={`/track/${track._id}?audio=${track.trackUrl}&id=${track._id}`}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 18,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                maxWidth: 200,
                                                textOverflow: 'ellipsis',
                                                color: '#fff',

                                                '&:hover': {
                                                    color: '#585858',
                                                },
                                            }}
                                        >
                                            {track.title}
                                        </Typography>
                                    </Link>
                                    <h4
                                        style={{
                                            fontSize: 15,
                                            margin: 0,
                                            opacity: 0.5
                                        }}
                                    >
                                        {track.description}
                                    </h4>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </Box >
        </>
    );
}

export default MainSlider