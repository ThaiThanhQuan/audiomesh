'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTrackContext } from "@/lib/track.wrapper";
import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";
import './main.slider.css'

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
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

    return (
        <Box sx={{ mx: '50px' }}>
            <h2>{title}</h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                navigation
                loop
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {data.map(track => {
                    const isCurrent = currentTrack._id === track._id
                    const isPlaying = isCurrent && currentTrack.isPlaying

                    return (
                        <SwiperSlide key={track._id}>
                            <div
                                onMouseEnter={() => setHoveredId(track._id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => {
                                    setCurrentTrack({
                                        ...track,
                                        isPlaying: !isPlaying,
                                    })
                                }}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                    height: 193,
                                }}
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                    alt={track.title}
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: 6,
                                        opacity: hoveredId === track._id ? 0.7 : 1,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />

                                {(hoveredId === track._id || isPlaying) &&
                                    (isPlaying ? (
                                        <PauseIcon sx={iconStyle(true)} />
                                    ) : (
                                        <PlayArrowIcon sx={iconStyle(true)} />
                                    ))}
                            </div>

                            <Box
                                sx={{
                                    mt: 1,
                                    textAlign: 'center',
                                }}
                            >
                                <Link
                                    href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: 17,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#fff',
                                            '&:hover': { color: '#585858' },
                                        }}
                                    >
                                        {track.title}
                                    </Typography>
                                </Link>

                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        opacity: 0.5,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {track.description}
                                </Typography>
                            </Box>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    )
}


export default MainSlider