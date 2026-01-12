'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface IProps {
    data: ITrackTop[]
    title: string
}

const MainSlider = (props: IProps) => {
    const { data, title } = props

    const PrevArrow = (props: any) => {
        return (
            <Button
                onClick={() => props.onClick()}
                sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
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
            <Button variant="outlined"
                onClick={() => props.onClick()}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
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

                '& .track': {
                    px: 1,
                },

                '& .track img': {
                    width: '100%',
                    borderRadius: '6px',
                },

                '& .track h4': {
                    margin: '4px 0',
                    fontSize: '14px',
                    color: '#fff',
                },

                '& .track h4:last-child': {
                    color: '#aaa',
                    fontSize: '12px',
                },
            }}
            >
                <h2>{title}</h2>
                <Slider {...settings}>
                    {data.map(track => {
                        return (
                            <div className="track" key={track._id}>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} />
                                <h4>{track.title}</h4>
                                <h4>{track.description}</h4>
                            </div>
                        )
                    })}
                </Slider>
            </Box >
        </>
    );
}

export default MainSlider