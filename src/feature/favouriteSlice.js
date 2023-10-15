import { createSlice } from "@reduxjs/toolkit";

let initialState = []

if(localStorage.getItem("images") === null){

    localStorage.setItem("images",JSON.stringify(initialState))
    
}else {
    let data = localStorage.getItem("images")
    initialState = JSON.parse(data)
}

export const favouriteSlice = createSlice({

    name: "favourite",
    initialState: initialState,
    reducers: {
        addPhoto: (state,action) => {
            localStorage.setItem("images",JSON.stringify([...state,action.payload]))
            return [...state,action.payload]
        },
        removePhoto: (state,action) => {
            localStorage.setItem("images",state.filter((image) => image.name !== action.payload.name))
            return state.filter((image) => image.name !== action.payload.name)
        },
        editPhoto: (state,action) => {
            state.map((image) => {
                if(image.name === action.payload.actualName){
                    image.name = action.payload.newName
                }
            })
            localStorage.setItem("images",JSON.stringify(state))
        }
    }
})

export const {addPhoto,removePhoto,editPhoto} = favouriteSlice.actions
export const getFavouritePhotos = (state) => state.favourite