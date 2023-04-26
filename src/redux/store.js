import { configureStore } from "@reduxjs/toolkit";
import JsonReducer from "./jsonSlice";

export default configureStore({
    reducer:{
        json:JsonReducer
    }
})
