'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from "next/link";
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTrackContext } from "@/lib/track.wrapper";
import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";

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
        slidesToScroll: 4,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <Box sx={{
                mx: '50px',

                '& .track': {
                    px: 1,
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
                                        width: '100%',
                                        height: '193px',
                                    }}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                        alt={`${track.title}`}
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            opacity: hoveredId === track._id ? 0.7 : 1,
                                            transition: 'opacity 0.3s ease',
                                            borderRadius: '6px',
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
                                        href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                        style={{
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 17,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                maxWidth: 180,
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
                                            fontSize: 14,
                                            margin: 0,
                                            opacity: 0.5,
                                            maxWidth: 190,
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
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