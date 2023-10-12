import { createSlice } from "@reduxjs/toolkit";


export const favouriteSlice = createSlice({

    name: "favourite",
    initialState: [],
    reducers: {
        addPhoto: (state,action) => {
            return [...state,action.payload]
        },
        removePhoto: (state,action) => {
            return state.filter((image) => image.name !== action.payload.name)
        }
    }
})

export const {addPhoto,removePhoto} = favouriteSlice.actions
export const getFavouritePhotos = (state) => state.favourite