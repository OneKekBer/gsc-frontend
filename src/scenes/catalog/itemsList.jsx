import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../state";
import { useEffect } from "react";
import Item from "./item";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import FlexCenterColumn from "../../components/flexCenterColumn";
import { getCatalogItems } from "../../state/catalog/catalog-slice";
import { TextField } from "@mui/material";
import { addInputFilter } from "../../state/inputFilter/inputFilter-reducer";
import { filteredItemsByInput } from "./../../state/catalog/filter-selector";

const ItemsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const items = useSelector((state) => state.catalog.items);
    const inputFilter = useSelector((state) => state.inputFilter.filter);
    const { loading, error } = useSelector((state) => state.catalog);

    const handleInputFilter = (e) => {
        dispatch(addInputFilter(e.target.value));
    };
    const isNonMobileScreen = useMediaQuery("(min-width:576px)");

    const filteredItems = useSelector((state) =>
        filteredItemsByInput(state.catalog.items, inputFilter)
    );

    return (
        <FlexCenterColumn>
            <Typography variant="h2" mb={10}>
                Products
            </Typography>
            <Box mb={10} width={isNonMobileScreen ? "80%" : "98%"}>
                <TextField
                    sx={{ width: "100%" }}
                    label="Search by name or tag"
                    value={inputFilter}
                    variant="outlined"
                    onChange={handleInputFilter}
                />
            </Box>
            {loading === "loading" ? (
                <Box>Loading</Box>
            ) : (
                <Grid
                    p={3}
                    container
                    justifyContent="center"
                    spacing={20}
                    alignItems="center"
                >
                    {filteredItems.map((item) => {
                        return <Item key={item.id} item={item} />;
                    })}
                </Grid>
            )}
        </FlexCenterColumn>
    );
};

export default ItemsList;
