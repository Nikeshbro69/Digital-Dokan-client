import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";

const initialState:IOrder = {
    status : Status.LOADING,
    items : [],
    khaltiUrl : null 
}


const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {
        setItems(state:IOrder, action:PayloadAction<IOrderItems[]>){
            state.items = action.payload
        },
        
        setStatus(state:IOrder, action:PayloadAction<Status>){
            state.status = action.payload
        },

        setKhaltiUrl(state:IOrder, action:PayloadAction<string>){
            state.khaltiUrl = action.payload
        }
    }
    
})

export const {setItems, setStatus, setKhaltiUrl} = orderSlice.actions 
export default orderSlice.reducer



export function orderItem(data : IData){
    return async function orderItemThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.post("/order", data)
            if(response.status === 200){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                if(response.data.url){
                    dispatch(setKhaltiUrl(response.data.url))
                }
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}