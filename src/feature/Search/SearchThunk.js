import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: 'vL7Gye9SqKGRMh98OV6GPyxOL44F70h4da8O2SXf2O8'
})


export const getPhotosThunk = createAsyncThunk("search/getPhotos", async (query) => {

    let search

    let response

    if(query !== ''){

        search = await unsplash.search.getPhotos({
            query: query,
            perPage: 28
        })

        response = search.response.results
    }
    else {
        search = await unsplash.photos.getRandom({
            count: 28
        })

        response = search.response
    }

    const images = response.map(image => ({

        name: image.alt_description,
        width: image.width,
        height: image.height,
        likes: image.likes,
        date: image.created_at,
        image_url: image.urls.regular,
        download_url: image.urls.full
    }));

     

    return images
})