import { createSlice } from "@reduxjs/toolkit";


export const favouriteSlice = createSlice({

    name: "favourite",
    initialState: [],
    reducers: {
        addPhoto: (state,action) => {
            return [...state,action.payload]
        }
    }
})

export const {addPhoto} = favouriteSlice.actions
export const getFavouritePhotos = (state) => state.favourite