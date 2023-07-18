import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: "idle", //laoding
    error: null,
    items: [],
};

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCatalogItems.pending, (state, action) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getCatalogItems.rejected, (state, action) => {
                state.loading = "idle";
                state.error = "error";
            })
            .addCase(getCatalogItems.fulfilled, (state, action) => {
                state.loading = "idle";
                state.error = null;
                state.items = action.payload;
            });
    },
});

export const { setItems } = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;

export const getCatalogItems = createAsyncThunk("getCatalogItems", async () => {
    const items = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/items?populate=*",
        {
            method: "GET",
        }
    );
    const itemsJson = await items.json();

    return itemsJson.data;
});
