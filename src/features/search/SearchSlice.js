import { createSlice } from "@reduxjs/toolkit";
import { getPhotosThunk } from "./SearchThunk";



export const searchSlice = createSlice({

    name: "search",
    initialState: {
        data: [],
        status: "idle",
        error: null
    },

    extraReducers: (builder) => {

        builder.addCase(getPhotosThunk.pending, (state, action) => {
            state.status = "pending"

        })
        .addCase(getPhotosThunk.rejected, (state,action) => {
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(getPhotosThunk.fulfilled, (state,action) => {
            state.status = "fulfilled"
            state.data = action.payload
        })
    }
})

export const getImages = (state) => state.search.data
export const getSearchStatus = (state) => state.search.status
export const getSearchError = (state) => state.search.error