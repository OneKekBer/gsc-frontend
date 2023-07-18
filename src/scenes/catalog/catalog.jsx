import React from "react";

import { Box } from "@mui/material";
import Navbar from "../navbar/navbar";
import ItemsList from "./itemsList";

import Footer from "../footer/footer";

const Catalog = () => {
    return (
        <Box>
            <Navbar />

            <ItemsList />
            <Footer />
        </Box>
    );
};

export default Catalog;
