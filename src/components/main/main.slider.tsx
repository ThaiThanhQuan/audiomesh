'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MainSlider = () => {

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
                margin: "0 50px",
                ".abc": {
                    padding: "0 10px"
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px"
                }
            }}
            >
                <h2>More of what you like</h2>
                <Slider {...settings}>
                    <div className="abc">
                        <h3>Track 1</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 2</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 3</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 4</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 5</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 6</h3>
                    </div>
                </Slider>
            </Box >
            <Box sx={{
                margin: "0 50px",
                ".abc": {
                    padding: "0 10px"
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px"
                }
            }}
            >
                <h2>More of what you like</h2>
                <Slider {...settings}>
                    <div className="abc">
                        <h3>Track 1</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 2</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 3</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 4</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 5</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 6</h3>
                    </div>
                </Slider>
            </Box >
            <Box sx={{
                margin: "0 50px",
                ".abc": {
                    padding: "0 10px"
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px"
                }
            }}
            >
                <h2>More of what you like</h2>
                <Slider {...settings}>
                    <div className="abc">
                        <h3>Track 1</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 2</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 3</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 4</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 5</h3>
                    </div>
                    <div className="abc">
                        <h3>Track 6</h3>
                    </div>
                </Slider>
            </Box >
        </>
    );
}

export default MainSlider