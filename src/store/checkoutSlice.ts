import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import type { IOrderDetail } from "../pages/my-orders-details/types";

const initialState:IOrder = {
    status : Status.LOADING,
    items : [],
    khaltiUrl : null,
    orderDetails : []
}


const orderSlice = createSlice({
    name : "orders",
    initialState,
    reducers : {
        setItems(state:IOrder, action:PayloadAction<IOrderItems[]>){
            state.items = action.payload
        },
        setOrderDetails(state:IOrder, action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        },
        setStatus(state:IOrder, action:PayloadAction<Status>){
            state.status = action.payload
        },

        setKhaltiUrl(state:IOrder, action:PayloadAction<string>){
            state.khaltiUrl = action.payload
        }
    }
    
})

export const {setItems, setStatus, setKhaltiUrl, setOrderDetails} = orderSlice.actions 
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

export function fetchMyOrders(){
    return async function fetchMyOrdersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order")
            if(response.status === 200){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchMyOrderDetails(id:string){
    return async function fetchMyOrderDetailThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order/" + id)
            console.log(response)
            if(response.status === 200){
                dispatch(setOrderDetails(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}