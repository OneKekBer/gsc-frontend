import { useSelector } from "react-redux";
import {
    Box,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";

import { axios } from "axios";
import { useTheme } from "@emotion/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
    "pk_test_51NORDAEurOKRp4rm30Jpf0FvtDNbvQe1PAXNkNmNQZE7987jwp56uK4oxePPFUu0v1BqsoobpbPi2PT2AmFOcHAJ00GivXcfId"
);

const Checkout = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const blue = theme.palette.primary.blue;
    const stepStyle = {
        background: 2,
        "& .Mui-active": {
            "&.MuiStepIcon-root": {
                // color: "black",
                borderRadius: "100%",

                fontSize: "2rem",
            },
        },
        "& .Mui-completed": {
            "&.MuiStepIcon-root": { color: blue, fontSize: "2rem" },
        },
    };

    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;
    const cartItems = useSelector((state) => state.cart.cart);
    if (cartItems.length === 0) {
        navigate("/catalog");
        toast("there are no items in cart!! please try again ");
    } else {
        console.log("Working");
    }

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        // this copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
                ...values.billingAddress,
                isSameAddress: true,
            });
        }

        if (isSecondStep) {
            makePayment(values);
        }

        actions.setTouched({});
    };

    async function makePayment(values) {
        const stripe = await stripePromise;
        const requestBody = {
            fullName:
                values.billingAddress.firstName +
                " " +
                values.billingAddress.lastName,
            email: values.email,
            country: values.billingAddress.country,
            street1: values.billingAddress.street1,
            street2: values.billingAddress.street2,
            city: values.billingAddress.city,
            state: values.billingAddress.state,
            zipCode: values.billingAddress.zipCode,

            products: cart.map((item) => {
                const quantity = item.quantity;
                const id = item.item.id;

                return {
                    id,

                    quantity,
                };
            }),
        };
        console.log(requestBody);

        const response = await fetch("http://localhost:1337/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: "bearer" + process.env.API_TOKEN,
            },
            body: JSON.stringify(requestBody),
        });
        const session = await response.json();
        console.log(session);

        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }

    return (
        <Box width="80%" m="100px auto">
            <Stepper sx={stepStyle} activeStep={activeStep}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                {isSecondStep === false && isFirstStep === false ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {" "}
                        <Typography variant="h2">
                            Please, wait for redirect
                        </Typography>{" "}
                    </Box>
                ) : (
                    ""
                )}
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap="50px"
                            >
                                {!isFirstStep && (
                                    <Button
                                        fullWidth
                                        color="primary"
                                        variant="contained"
                                        sx={{
                                            background: "lightGrey",
                                            boxShadow: "none",
                                            color: "white",
                                            borderRadius: 0,
                                            padding: "15px 40px",
                                        }}
                                        onClick={() =>
                                            setActiveStep(activeStep - 1)
                                        }
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        background: "lightGrey",
                                        boxShadow: "none",
                                        color: "white",
                                        borderRadius: 0,
                                        padding: "15px 40px",
                                    }}
                                >
                                    {!isSecondStep ? "Next" : "Place Order"}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            <Box mt={5}>
                <Button
                    display="flex"
                    alignItems="center"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/catalog")}
                    sx={{
                        boxShadow: "none",

                        borderRadius: 0,
                        padding: "15px 40px",
                    }}
                >
                    <ArrowBackIcon />
                    Back to shopping
                </Button>
            </Box>
        </Box>
    );
};

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    email: "",
    phoneNumber: "",
};

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required"),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            lastName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            country: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            street1: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            street2: yup.string(),
            city: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            state: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            zipCode: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
    }),
];

export default Checkout;
