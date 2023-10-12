import { createSlice } from "@reduxjs/toolkit";


const initialState = [{
    title: '',
    height: '',
    width: '',
    likes: 0,

}]


export const favouriteSlice = createSlice({

    name: "favourite",
    initialState: [],
    reducers: {
        addPhoto: (state,action) => {
            state.data = [...state.data,action.payload]
        }
    }
})

export const {addPhoto} = favouriteSlice.actions
export const getFavouritePhotos = (state) => state.favourites