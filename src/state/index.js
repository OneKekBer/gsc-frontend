import { configureStore } from "@reduxjs/toolkit";

import { cartReducer } from "./cart/cart-slice";
import { catalogReducer } from "./catalog/catalog-slice";
import { productReducer } from "./product-details/product-slice";
import { inputFilterReducer } from "./inputFilter/inputFilter-reducer";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        catalog: catalogReducer,
        product: productReducer,
        inputFilter: inputFilterReducer,
    },
    devTools: true,
});
