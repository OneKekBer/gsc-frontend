import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Rating from "@mui/material/Rating";

import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    Button,
    IconButton,
    TextField,
} from "@mui/material";
import FlexCenterColumn from "../../components/flexCenterColumn";

import ItemAccordion from "./itemAccordion";

import PersonIcon from "@mui/icons-material/Person";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./item.scss";
import Container from "../../components/Container";
import { useTheme } from "@emotion/react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";

import { getItem } from "../../state/product-details/product-slice";
import { addToCart, toggleCart } from "../../state/cart/cart-slice";
import FlexSpace from "../../components/flexSpace";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// import Swiper core and required modules
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "./../footer/footer";
import { addInputFilter } from "../../state/inputFilter/inputFilter-reducer";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ItemDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { itemId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const blue = theme.palette.primary.blue;
    const lightYellow = theme.palette.primary.lightYellow;
    const white = theme.palette.primary.white;
    const red = theme.palette.primary.red;
    const purple = theme.palette.primary.purple;

    const isNonMobileScreen = useMediaQuery("(min-width:576px)");

    const item = useSelector((state) => state.product.product);
    const { error, loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getItem(itemId));
    }, [itemId]);
    // const color = 'primary' + '.' +

    const totalReviews = item?.attributes?.Reviews?.data.reduce(
        (acc, item) => acc + item?.attributes?.Rating,
        0
    );

    const totalItems = item?.attributes?.Reviews?.data.length;
    const averageComments = (totalReviews / totalItems).toFixed();

    const [open, setOpen] = useState(false);
    const thumbnailsRef = React.useRef(null);

    const slides = item?.attributes?.Photos?.data?.map((i) => {
        return { src: i.attributes.url };
    });

    return (
        <Box>
            <Navbar />
            <Lightbox
                open={open}
                // plugins={[Thumbnails]}
                thumbnails={{ ref: thumbnailsRef }}
                close={() => setOpen(false)}
                on={{
                    click: () => {
                        (thumbnailsRef.current?.visible
                            ? thumbnailsRef.current?.hide
                            : thumbnailsRef.current?.show)?.();
                    },
                }}
                slides={slides}

                // { src: product1 },
                // { src: product2 },
                // { src: product3 },
                // { src: product4 },
            />

            <Container>
                {loading === "loading" ? (
                    <Box>Loading</Box>
                ) : (
                    <FlexCenterColumn>
                        <Grid
                            container
                            display="flex"
                            justifyContent="space-around"
                        >
                            <Grid md={5} lg={5} sm={12} xs={12} item>
                                <Swiper
                                    sx={{
                                        height: "100%",
                                    }}
                                    modules={[Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    loop={true}
                                    pagination={{ clickable: true }}
                                >
                                    {item?.attributes?.Photos?.data?.map(
                                        (i) => {
                                            return (
                                                <SwiperSlide key={i.id}>
                                                    <img
                                                        alt="img"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                            setOpen(true)
                                                        }
                                                        width="100%"
                                                        src={i.attributes.url}
                                                    />
                                                </SwiperSlide>
                                            );
                                        }
                                    )}
                                </Swiper>

                                {/* <img
                                    style={{
                                        objectFit: "contain",
                                        overflow: "hidden",
                                    }}
                                    // height="900vh"
                                    width="100%"
                                    src={"http://localhost:1337" + photo}
                                /> */}
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={5}
                                lg={5}
                                sx={{
                                    textAlign: isNonMobileScreen
                                        ? "start"
                                        : "center",
                                    "& > *": {
                                        marginBottom: "20px",
                                    },
                                }}
                            >
                                <Typography variant="h4">
                                    {item?.attributes?.Name}
                                </Typography>
                                <Typography alignItems="center" variant="h5">
                                    <span
                                        style={{
                                            color: item?.attributes?.Color,
                                        }}
                                    >
                                        {item?.attributes?.Volume}ml
                                    </span>
                                    | volume
                                </Typography>
                                <Typography variant="h6">
                                    {totalItems === 0 && totalReviews === 0 ? (
                                        <Box>There are no comments yet..</Box>
                                    ) : (
                                        <Box>Reviews: {averageComments}/5</Box>
                                    )}
                                </Typography>

                                <Typography variant="h4" position="relative">
                                    {item?.attributes?.Price}${" "}
                                    <span
                                        style={{
                                            color: item?.attributes?.Color,
                                        }}
                                        className="discount"
                                    >
                                        {item?.attributes?.Discount}$
                                    </span>
                                </Typography>

                                <Typography>
                                    {item?.attributes?.SmallDiscription}
                                </Typography>
                                <ItemAccordion
                                    color={item?.attributes?.Color}
                                    LargeDiscription={
                                        item?.attributes?.LargeDiscription
                                    }
                                    Ingridients={item?.attributes?.Ingridients}
                                />
                                <FlexSpace width="100%">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <Typography>
                                            {quantity <= 0
                                                ? setQuantity(1)
                                                : quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() =>
                                                setQuantity(quantity - 1)
                                            }
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        // color={blue}
                                        onClick={() => {
                                            setQuantity(1);
                                            dispatch(toggleCart());
                                            dispatch(
                                                addToCart({ item, quantity })
                                            );
                                        }}
                                    >
                                        Buy Now{" "}
                                        {item?.attributes?.Price * quantity}$
                                    </Button>
                                </FlexSpace>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Typography variant="h6">tags:</Typography>
                                    <Button
                                        onClick={() => {
                                            navigate("/catalog");
                                            dispatch(
                                                addInputFilter(
                                                    item?.attributes?.Type
                                                )
                                            );
                                        }}
                                        variant="contained"
                                        size="small"
                                    >
                                        #{item?.attributes?.Type}
                                    </Button>
                                    {/* {item?.attributes?.Type.map((type) => {
                                        return <Box>{type}</Box>;
                                    })} */}
                                </Box>
                            </Grid>
                        </Grid>
                    </FlexCenterColumn>
                )}
            </Container>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ background: lightYellow }}
            >
                <Box my={20} width={isNonMobileScreen ? "80%" : "100%"}>
                    <Typography align="center" variant="h3">
                        Reviews
                    </Typography>
                    {item?.attributes?.Reviews?.data?.length === 0 ? (
                        <Box>There are no comments</Box>
                    ) : (
                        <FlexCenterColumn>
                            {item?.attributes?.Reviews?.data?.map((rev) => {
                                const { Autor, Date, Rating, ReviewText } =
                                    rev?.attributes;

                                return (
                                    <Box
                                        sx={{
                                            background: white,
                                        }}
                                        width="100%"
                                        display="flex"
                                        flexDirection="column"
                                        my={4}
                                        py={3}
                                        px={2}
                                        className="review"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Box
                                                display="flex"
                                                gap={2}
                                                alignItems="center"
                                            >
                                                <PersonIcon />
                                                <Typography variant="h4">
                                                    {Autor}
                                                </Typography>
                                            </Box>
                                            <Box>{Date}</Box>
                                        </Box>
                                        <Box my={3}>
                                            <Typography variant="text2">
                                                {ReviewText}
                                            </Typography>
                                        </Box>

                                        <Box>{Rating}/5</Box>
                                    </Box>
                                );
                            })}
                        </FlexCenterColumn>
                    )}
                </Box>
            </Box>
            {/* <Container>
                <FlexCenterColumn>
                    <Typography align="center" variant="h3">
                        Place your review
                    </Typography>

                    <TextField label="Outlined" variant="outlined" />
                </FlexCenterColumn>
            </Container> */}
            <Footer />
        </Box>
    );
};

export default ItemDetails;
