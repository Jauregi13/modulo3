import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "../feature/Search/SearchSlice";
import { favouriteSlice } from "../feature/favouriteSlice";


export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
        favourite: favouriteSlice.reducer
    }
})