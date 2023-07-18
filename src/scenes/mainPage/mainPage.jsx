import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Typography, useMediaQuery } from "@mui/material";

import FlexCenterColumn from "../../components/flexCenterColumn.jsx";
import Container from "../../components/Container.jsx";
import Footer from "../footer/footer.jsx";
import Navbar from "../navbar/navbar.jsx";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import hero1 from "../../assets/image/hero1.png";
import hero2 from "../../assets/image/hero2.png";
import hero3 from "../../assets/image/hero3.png";

import Lottie from "lottie-react";
import cosmeticAnim from "../../assets/animation/cosmetic.json";

import { getCatalogItems } from "../../state/catalog/catalog-slice";

import nat1 from "../../assets/image/nat1.png";
import nat2 from "../../assets/image/nat2.png";
import nat3 from "../../assets/image/nat3.png";
import nat4 from "../../assets/image/nat4.png";
import { useTheme } from "@emotion/react";

import AdvantagesBlock from "./advantagesBlock";

import FlexCenter from "../../components/flexCenter";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import AboutComponent from "./aboutComponent";
import BestSellersComponent from "./bestSellersComponent";

import Marquee from "react-fast-marquee";

const Animation = () => {
    return (
        <Box>
            <Lottie
                lottieRef={cosmeticAnim}
                onComplete={() => {
                    cosmeticAnim?.current.goToAndPlay(43, true);
                }}
                loop={false}
                style={{ height: 400, width: 400 }}
                animationData={cosmeticAnim}
            />
        </Box>
    );
};

const fetchBest = () => {
    fetch("http://localhost:1337/api/items?filters[isBestseller]=true")
        .then((res) => res.json())
        .then((res) => {
            const data = res.data;
            return data;
        })
        .catch((err) => console.log(err));
};

const MainPage = () => {
    const [bestsellers, setBestseller] = useState();

    const isNonMobileScreen576 = useMediaQuery("(min-width:576px)");
    const isNonMobileScreen970 = useMediaQuery("(min-width:970px)");
    const photos = [hero1, hero2, hero3];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const theme = useTheme();
    const blue = theme.palette.primary.blue;
    const lightYellow = theme.palette.primary.lightYellow;
    const white = theme.palette.primary.white;
    const red = theme.palette.primary.red;
    const lightPink = theme.palette.primary.lightPink;
    const lightBlue = theme.palette.primary.lightBlue;

    // async function getBestseller() {
    //     const item = await fetch(
    //         `http://localhost:1337/api/items?filters[isBestseller]=true`,
    //         {
    //             method: "GET",
    //         }
    //     );
    //     const itemJson = await item.json();
    //     setBestseller(itemJson.data);
    // }

    useEffect(() => {
        dispatch(getCatalogItems());
        // getBestseller();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const items = useSelector((state) => state.catalog.items);
    const bestSellers = useSelector((state) => {
        return state.catalog.items.filter(
            (item) => item.attributes.isBestseller === true
        );
    });

    return (
        <Box className="Wrapper">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", background: lightBlue }}
            >
                <Typography fontWeight="600" variant="h6">
                    30% Discounts!!
                </Typography>
            </Box>
            <Navbar />
            <Box mb={4} className="hero" justifyItems="center">
                <Swiper
                    className="hero__swiper"
                    modules={[Pagination, Autoplay]}
                    spaceBetween={5}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                    }}
                >
                    {photos.map((photo) => {
                        return (
                            <SwiperSlide>
                                <Box
                                    sx={{
                                        backgroundImage: `url(${photo})`,
                                        width: "100vw",
                                        height: "70vh",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center bottom ",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                ></Box>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>

            <AboutComponent />
            <div className="backgroundCircle"></div>

            <BestSellersComponent bestSellers={bestSellers} />

            <Box my={5} px={1} py={20} sx={{ backgroundColor: lightPink }}>
                <Box
                    display="flex"
                    justifyContent="space-around"
                    flexDirection={isNonMobileScreen970 ? "row" : "column"}
                    alignItems="center"
                    gap={isNonMobileScreen970 ? 10 : 5}
                >
                    <FlexCenter
                        gap={2}
                        flexDirection={isNonMobileScreen970 ? "column" : "row"}
                        width={isNonMobileScreen970 ? "50%" : "100%"}
                    >
                        <img className="img" src={nat1} alt="" />
                        <img className="img" src={nat3} alt="" />
                    </FlexCenter>
                    <FlexCenterColumn
                        width={isNonMobileScreen970 ? "10%" : "90%"}
                    >
                        <Typography align="center" variant="h4">
                            GALGY IT IS 100% NATURAL PRODUCTS
                        </Typography>
                    </FlexCenterColumn>

                    <FlexCenter
                        gap={2}
                        flexDirection={isNonMobileScreen970 ? "column" : "row"}
                        width={isNonMobileScreen970 ? "50%" : "100%"}
                    >
                        <img className="img" src={nat4} alt="" />
                        <img className="img" src={nat2} alt="" />
                    </FlexCenter>
                </Box>
            </Box>

            {/* <Box
                py={5}
                sx={{
                    background:
                        "linear-gradient(133deg, rgba(196,251,253,1) 0%, rgba(92,225,230,1) 100%, rgba(138,138,138,1) 100%, rgba(87,87,87,1) 100%)",
                }}
            >
                <Marquee gradient={false} autoFill={true} speed={40}>
                    <Typography sx={{ fontWeight: 700 }} variant="h1">
                        {" "}
                        GALGYISNATURALGALGYISHEREGALGYISNATURALGALGYISHERE
                    </Typography>
                </Marquee>
            </Box> */}

            <Container className="advantages">
                <FlexCenterColumn p={4}>
                    <Typography mb={5} variant="h1">
                        Advantages
                    </Typography>
                    <Grid
                        rowSpacing={{ lg: 10, md: 7, sm: 5, xs: 2 }}
                        justifyContent="center"
                        alignItems="center"
                        spacing={10}
                        container
                    >
                        <Grid item sm={12} md={10} lg={5}>
                            <AdvantagesBlock
                                title="Natural Products"
                                disc=" Galgy skincare focus on natural ingredients can be beneficial for those with sensitive skin or those who prefer to use products free from harsh chemicals."
                            />
                        </Grid>
                        <Grid item sm={12} md={10} lg={5}>
                            <AdvantagesBlock
                                title="Holistic Approach"
                                disc="Galgy skincare may emphasize the importance of a healthy lifestyle, including proper nutrition, hydration, exercise, and stress management, which can contribute to overall skin health."
                            />
                        </Grid>

                        <Grid item sm={12} md={10} lg={5}>
                            <AdvantagesBlock
                                title="Customizable Solutions"
                                disc="Galgy skincare  this approach allows individuals to tailor their skincare routine based on their specific needs, helping them address issues such as dryness, acne, aging, or hyperpigmentation effectively."
                            />
                        </Grid>
                        <Grid item sm={12} md={10} lg={5}>
                            <AdvantagesBlock
                                title="Scientific Backing"
                                disc="Galgy skincare products  may collaborate with dermatologists, scientists, and skincare experts to create effective and evidence-based products. This scientific"
                            />
                        </Grid>
                    </Grid>
                </FlexCenterColumn>
            </Container>

            <Footer />
        </Box>
    );
};

export default MainPage;
