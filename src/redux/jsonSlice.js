import {createSlice} from "@reduxjs/toolkit";

const jsonSlice=createSlice({
    name:'json',
    initialState:[],
    reducers:{
        updateJson:(state,action)=>{
            return action.payload
        }
    }
})

export const {updateJson}=jsonSlice.actions;

export default jsonSlice.reducer;