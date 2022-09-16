import {configureStore} from "@reduxjs/toolkit";
import catsReducer from "./slices/catsSlice"

const store = configureStore({
    reducer: {
        catsReducer
    }
})

export default store