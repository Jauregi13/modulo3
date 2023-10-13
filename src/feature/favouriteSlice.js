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
        },
        editPhoto: (state,action) => {
            state.map((image) => {
                if(image.name === action.payload.actualName){
                    image.name = action.payload.newName
                }
            })
        }
    }
})

export const {addPhoto,removePhoto,editPhoto} = favouriteSlice.actions
export const getFavouritePhotos = (state) => state.favourite