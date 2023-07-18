import { Box, CssBaseline } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { themeSettings } from "./theme";
import MainPage from "./scenes/mainPage/mainPage";
import Catalog from "./scenes/catalog/catalog";
import ItemDetails from "./scenes/itemDetails/itemDetails";
import Checkout from "./scenes/checkout/checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import { useEffect } from "react";

const theme = createTheme(themeSettings("light"));

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <Box>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="item/:itemId" element={<ItemDetails />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="checkout/success" element={<Confirmation />} />
                    <Route path="checkout/failure" element={<Confirmation />} />
                </Routes>
            </ThemeProvider>
        </Box>
    );
}

export default App;
