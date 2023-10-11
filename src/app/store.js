import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "../feature/Search/SearchSlice";


export const store = configureStore({
    reducer: {
        search: searchSlice.reducer
    }
})