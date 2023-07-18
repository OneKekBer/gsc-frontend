import React from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexCenterColumn from "../../components/flexCenterColumn";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import FlexAround from "../../components/flexAround";
import { Link } from "react-router-dom";

const Footer = () => {
    const theme = useTheme();
    const yellow = theme.palette.primary.yellow;
    return (
        <Box sx={{ background: yellow }} py={3} mt={4}>
            <FlexCenterColumn>
                <Typography variant="h6">CONTACTS</Typography>
                <Typography variant="h6">galgycorporation@gmail.com</Typography>
                <Box justifyContent="center" alignItems="center">
                    <IconButton href="#">
                        <InstagramIcon color="black" />
                    </IconButton>
                    <IconButton href="#">
                        <TwitterIcon color="black" />
                    </IconButton>
                    <IconButton href="#">
                        <FacebookIcon color="black" />
                    </IconButton>
                </Box>
                <Box justifyContent="center" alignItems="center">
                    <Button
                        href="#"
                        variant="text"
                        sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        privacy
                    </Button>
                    <Button
                        href="#"
                        variant="text"
                        sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        returns
                    </Button>
                    <Button
                        href="#"
                        variant="text"
                        sx={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            color: "black",
                        }}
                    >
                        licenses
                    </Button>
                </Box>
            </FlexCenterColumn>
        </Box>
    );
};

export default Footer;
