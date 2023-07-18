import {
    Box,
    Button,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexAround from "./../../components/flexAround";
import FlexCenter from "./../../components/flexCenter";

import "./navbar.scss";

import MenuIcon from "@mui/icons-material/Menu";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import Cart from "../mainPage/cart";
import { toggleCart } from "../../state/cart/cart-slice";

import logo from "../../assets/image/logo33.png";
import { ToastContainer } from "react-toastify";

function Navbar() {
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isNonMobileScreen = useMediaQuery("(min-width:576px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCart = () => {
        dispatch(toggleCart());
    };

    return (
        <Box mb={isNonMobileScreen ? 10 : 3}>
            <Box p={2} position="sticky">
                <ToastContainer />
                <FlexAround>
                    {isNonMobileScreen ? (
                        <></>
                    ) : (
                        <div className="mobile-menu">
                            <IconButton
                                fontSize="60px"
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                                className="menu"
                                sx={{ padding: "20px" }}
                            >
                                {/* <MenuItem onClick={handleClose}>
                                    About us
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Reviews
                                </MenuItem> */}

                                <MenuItem onClick={() => navigate("/catalog")}>
                                    Products
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                    <IconButton
                        p={1}
                        onClick={() => navigate("/")}
                        fontSize="40px"
                    >
                        {/* <img width="70px" className="Logo" src={logo} alt="" /> */}
                        <Box color="black" fontWeight="500">
                            GSC
                        </Box>
                    </IconButton>
                    {isNonMobileScreen ? (
                        <FlexCenter gap={5}>
                            {/* <Typography variant="h5">About us</Typography>
                            <Typography variant="h5">Reviews</Typography> */}

                            <Typography
                                sx={{
                                    cursor: "pointer",

                                    "&:hover": {
                                        borderBottom: "2px solid black",
                                        transition: "all 1s ease",
                                    },
                                }}
                                variant="h5"
                                onClick={() => navigate("/catalog")}
                            >
                                Products
                            </Typography>
                        </FlexCenter>
                    ) : (
                        <></>
                    )}
                    <Box className="cart">
                        <IconButton
                            onClick={() => {
                                dispatch(toggleCart());
                            }}
                        >
                            <ShoppingBasketIcon sx={{ fontSize: "40px" }} />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={isCartOpen}
                            onClose={handleCart}
                        >
                            <Cart handleCart={handleCart} />
                        </Drawer>
                    </Box>
                </FlexAround>
            </Box>
        </Box>
    );
}

export default Navbar;
