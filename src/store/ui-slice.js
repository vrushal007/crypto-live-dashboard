import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name:'ui',
    initialState:{
        items:[]
    },
    reducers:{
        updateItems(state,action){
            state.items = action.payload
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;