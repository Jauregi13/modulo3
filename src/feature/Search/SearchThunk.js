import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: 'vL7Gye9SqKGRMh98OV6GPyxOL44F70h4da8O2SXf2O8'
})


export const getPhotosThunk = createAsyncThunk("search/getPhotos", async (query) => {

    const search = await unsplash.search.getPhotos({
        query: query
    })

    const response = search.response


    const images = response.results.map(image => ({

        url : image.urls.thumb,
        name: image.alt_description,
        width: image.width,
        height: image.height,
        likes: image.likes
    }));

     

    return images
})