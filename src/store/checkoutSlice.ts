import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import type { IData, IOrder, IOrderItems } from "../pages/checkout/types";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import type { IOrderDetail } from "../pages/my-orders-details/types";
import { OrderStatus } from "../pages/my-orders-details/types";

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
        },
        
        updateOrderStatusToCancel(state:IOrder, action:PayloadAction<{orderId:string}>){
            const orderId = action.payload.orderId
            // state.items.map((item)=>)
            // const data = state.items.find((item)=>item.id === orderId)
            // if(data){
            //     data.orderStatus = OrderStatus.Cancelled
            // }

            // const data = state.orderDetails.map((order)=>order.orderId === orderId ? {...order, [order.order.orderStatus] : OrderStatus.Cancelled}: order)
            // console.log(data,"ST")
            const datas = state.orderDetails.find((order)=>order.orderId === orderId)
            datas ? datas.order.orderStatus = OrderStatus.Cancelled : ""
        },

        updateOrderStatusInSlice(state:IOrder, action:PayloadAction<{status:OrderStatus, userId : string, orderId:string}>){
            const {status, orderId} = action.payload
            console.log(status,"sliceststus")
            const updatedOrder = state.items.map((order)=>order.id === orderId ? {...order, orderStatus : status} : order)
            console.log(updatedOrder,"slice")
            state.items = updatedOrder
        }

    }
    
})

export const {setItems, setStatus, setKhaltiUrl, setOrderDetails, updateOrderStatusToCancel, updateOrderStatusInSlice} = orderSlice.actions 
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

export function cancelOrderAPI(id:string){
    return async function cancelOrderTAPIhunk(dispatch:AppDispatch){
        console.log(id,"mero")
        try {
            const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id)
            console.log(response, "response")
            if(response.status === 200){
                dispatch(updateOrderStatusToCancel({orderId : id}))
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


