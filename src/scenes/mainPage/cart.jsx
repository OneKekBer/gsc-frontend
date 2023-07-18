import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FlexCenterColumn from "../../components/flexCenterColumn";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
    incrementCartItem,
    removeFromCart,
    toggleCart,
} from "../../state/cart/cart-slice";

import FlexSpace from "../../components/flexSpace";

const Cart = ({ handleCart }) => {
    const cart = useSelector((state) => state.cart.cart);
    const isNonMobileScreen = useMediaQuery("(min-width:576px)");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <Box>
            <Box
                width={isNonMobileScreen ? "500px" : "90%"}
                height="100%"
                p={3}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Typography variant="h4">Cart</Typography>
                    <IconButton onClick={handleCart}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {cart.length === 0 ? (
                    <Box>Cart is empty...</Box>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="space-between"
                        height="90%"
                    >
                        <FlexCenterColumn mb={2}>
                            <Box>
                                {cart.map((pp) => {
                                    const quantity = pp.quantity;
                                    const item = pp.item;
                                    console.log(item.id);
                                    const id = item.id;
                                    const photo =
                                        item?.attributes?.Photos?.data[0]
                                            ?.attributes?.url;

                                    return (
                                        <Box
                                            display="flex"
                                            key={`${item.attributes.name}-${item.id}`}
                                        >
                                            <Box
                                                onClick={() => {
                                                    navigate(
                                                        `/item/${item.id}`
                                                    );
                                                    dispatch(toggleCart());
                                                }}
                                                sx={{
                                                    width: "30%",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <img
                                                    width="100%"
                                                    src={photo}
                                                    alt="photo"
                                                />
                                            </Box>
                                            <Box
                                            // display="flex"
                                            // // flexDirection="column"
                                            // justifyContent="center"
                                            >
                                                <Typography variant="h6">
                                                    {item.attributes.Name}
                                                </Typography>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography variant="h6">
                                                        {item.attributes.Price}
                                                        $x{quantity}
                                                    </Typography>
                                                    {/* <Box
                                                        display="flex"
                                                        alignItems="center"
                                                    >
                                                        <Button
                                                            variant="text"
                                                            color="secondary"
                                                            onClick={() => {
                                                                dispatch(
                                                                    incrementCartItem(
                                                                        {
                                                                            id,
                                                                            quantity,
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        >
                                                            +
                                                        </Button>
                                                        <Box>{quantity}</Box>
                                                        <Button
                                                            variant="text"
                                                            color="secondary"
                                                        >
                                                            -
                                                        </Button>
                                                    </Box> */}
                                                </Box>
                                            </Box>
                                            <Box>
                                                <IconButton
                                                    onClick={() => {
                                                        dispatch(
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </FlexCenterColumn>

                        <FlexSpace
                            sx={{
                                borderTop: "2px solid rgba(0,0,0,0.3)",
                            }}
                            mt={2}
                            pt={3}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    navigate("/checkout");
                                    dispatch(toggleCart());
                                }}
                            >
                                Complete order
                            </Button>

                            <Box>
                                total price:
                                {cart
                                    .reduce(
                                        (acc, item) =>
                                            acc +
                                            item.quantity *
                                                item.item.attributes.Price,
                                        0
                                    )
                                    .toFixed()}
                                $
                            </Box>
                        </FlexSpace>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Cart;
