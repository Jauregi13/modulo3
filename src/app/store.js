import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "../features/search/SearchSlice";
import { favouriteSlice } from "../features/favourite/favouriteSlice";


export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        favourite: favouriteSlice.reducer
    }
})