import React from "react";
import Container from "./../../components/Container";
import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import "./MainPage.scss";

const AboutComponent = () => {
    const container = {
        hidden: { opacity: 0, y: 100 },
        show: {
            y: 0,
            opacity: 1,
            delay: 2,
            transition: { duration: 1 },
        },
    };

    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };
    const isNonMobileScreen576 = useMediaQuery("(min-width:576px)");
    return (
        <Container
            sx={{ overflow: "hidden" }}
            display={isNonMobileScreen576 ? "flex" : ""}
            my={20}
            gap={10}
        >
            <motion.div
                className="aboutContainer"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                <Typography align="center" variant="h1">
                    About Us
                </Typography>
                <Typography align="center" variant="text1">
                    Galgy Skincare is a renowned cosmetics brand known for its
                    innovative and effective skincare products. With a
                    commitment to providing high-quality and safe skincare
                    solutions, Galgy has gained a strong reputation in the
                    beauty industry.
                </Typography>
            </motion.div>
            {/* <Box justifyContent="center" alignItems="center">
                    <Animation />
                </Box> */}
        </Container>
    );
};

export default AboutComponent;
