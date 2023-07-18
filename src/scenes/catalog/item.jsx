import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import "./item.scss";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Item = ({ item }) => {
    const { Name, Price, Discount, Color } = item?.attributes;
    const { id } = item;

    const img = item?.attributes?.Photos?.data[0]?.attributes?.url;
    const theme = useTheme();
    const blue = theme.palette.primary.blue;
    const red = theme.palette.primary.red;
    const purple = theme.palette.primary.purple;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quantity = 1;

    return (
        <Grid key={id} item md={6} sm={10} xs={12}>
            <Box
                sx={{ boxShadow: 10, borderRadius: "16px" }}
                zIndex={2}
                className="card"
                display="flex"
                flexDirection="column"
                position="relative"
                onClick={() => navigate(`/item/${id}`)}
                height="100%"
            >
                <img src={img} alt={Name} />
                <Box className="intro">
                    <Typography color={Color} variant="h4">
                        {Name}
                    </Typography>
                    <Typography variant="h5">
                        <span>{Price}</span>$
                        <span className="line-text">{Discount}</span>
                        {/* <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                dispatch(toggleCart());
                                dispatch(addToCart({ item, quantity }));
                            }}
                        >
                            Buy Now
                        </Button> */}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
};

export default Item;

// {
//     item?.attributes?.Photos?.data?.map((i) => {
//         return (
//             <SwiperSlide key={i.id}>
//                 <img
//                     width="100%"
//                     style={{}}
//                     src={"http://localhost:1337" + i.attributes.url}
//                     alt="photo"
//                 />
//             </SwiperSlide>
//         );
//     });
// }
