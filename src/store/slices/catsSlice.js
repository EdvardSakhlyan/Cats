import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const categoriesURL = 'https://api.thecatapi.com/v1/categories'

const getCatsAsync = async (param) => {
    const {page , categoryID} = param
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&category_ids=${categoryID}`)
    const {data} = response
    return data
}

export const getCats = createAsyncThunk("getCats/request", getCatsAsync)

const getCatsCategoriesAsync = async () => {
    const response = await axios.get(categoriesURL)
    const {data} = response
    return data
}

export const getCategory = createAsyncThunk("getCategory/request", getCatsCategoriesAsync)


const catsSlice = createSlice({
    name: "cats/slice",
    initialState: {
        cats: {
            catsStatus : false,
            catsArray: [],
            page : 1,
        },
        categories: {
            categoriesStatus : false,
            categoriesArray: []
        }
    },
    reducers: {
        changeLimit () {

        },
        // changeCategory (state , action) {
        //     state.cats.categoryID = action.payload
        // },
        moreCats (state , action) {
            if (action.payload){
                state.cats.page = action.payload
            }else {
                state.cats.page += 1
            }

        }
    },
    extraReducers: {
        [getCategory.pending] : (state) => {
            state.categories.status = false
        },
        [getCategory.fulfilled] : (state , action) => {
            state.categories.categoriesStatus = true
            state.categories.categoriesArray = action.payload
        },
        [getCategory.rejected] : (state) => {
            state.categories.categoriesStatus = false
        },
        [getCats.fulfilled] : (state , action) => {
            state.categories.catsStatus = true
            if (state.cats.page > 1) {
                console.log(state.cats.page)
                state.cats.catsArray = [...state.cats.catsArray , ...action.payload]
            }else{
                state.cats.catsArray = action.payload
            }

            state.cats.catsStatus = true

        },
        [getCategory.pending] : (state) => {
            state.cats.catsStatus = false
        },
        [getCats.rejected] : (state) => {
            state.cats.catsStatus = false
        }
    }
})

export const  {moreCats} = catsSlice.actions

export default catsSlice.reducer
