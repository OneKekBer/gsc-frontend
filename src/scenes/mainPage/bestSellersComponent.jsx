import React from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BestSellersComponent = ({ bestSellers }) => {
    const isNonMobileScreen576 = useMediaQuery("(min-width:576px)");
    const isNonMobileScreen970 = useMediaQuery("(min-width:970px)");

    const theme = useTheme();
    const blue = theme.palette.primary.blue;
    const lightYellow = theme.palette.primary.lightYellow;
    const white = theme.palette.primary.white;
    const red = theme.palette.primary.red;
    const lightPink = theme.palette.primary.lightPink;
    const lightBlue = theme.palette.primary.lightBlue;

    const navigate = useNavigate();
    return (
        <Box py={10} my={15} sx={{}}>
            <Typography my={5} variant="h3" color={blue}>
                Bestsellers:
            </Typography>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={isNonMobileScreen576 ? 3 : 1}
                height="100vh"
            >
                {bestSellers.map((item) => {
                    const img =
                        item?.attributes?.Photos?.data[0]?.attributes?.url;
                    return (
                        <SwiperSlide key={item.id}>
                            <motion.div
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.5 },
                                }}
                                whileTap={{ scale: 0.9 }}
                                sx={{ cursor: "pointer" }}
                                onClick={() => navigate(`/item/${item.id}`)}
                            >
                                <img width="100%" src={img} alt="" />
                            </motion.div>
                            <Typography variant="h5">
                                {" "}
                                {item.attributes.Name}
                            </Typography>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Box>
    );
};

export default BestSellersComponent;
