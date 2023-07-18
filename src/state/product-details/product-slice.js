import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: "idle", //laoding
    error: null,
    product: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItem.pending, (state, action) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getItem.rejected, (state, action) => {
                state.loading = "idle";
                state.error = "error";
            })
            .addCase(getItem.fulfilled, (state, action) => {
                state.loading = "idle";
                state.error = null;
                state.product = action.payload;
            });
    },
});

export const { setItems } = productSlice.actions;

export const productReducer = productSlice.reducer;

export const getItem = createAsyncThunk("getItem", async (id) => {
    const item = await fetch(
        process.env.REACT_APP_SERVER_URL + `/api/items/${id}?populate=*`,
        { method: "GET" }
    );
    const itemJson = await item.json();
    return itemJson.data;
});
