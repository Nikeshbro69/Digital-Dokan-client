import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";

import type { AppDispatch } from "./store";
import { APIWITHTOKEN } from "../http";
import type { IOrderDetail, PaymentMethod, PaymentStatus} from "../pages/my-orders-details/types";

export interface IAdminOrder{
    id : string,
    productQty : number,
    orderStatus? : string,
    totalAmount? : number,
    payment? : {
        paymentMethod : PaymentMethod,
        paymentStatus : PaymentStatus
    }
}
interface IInitialState{
    items  : IAdminOrder[],
    status : Status,
    orderDetails : IOrderDetail[]
}

const initialState:IInitialState = {
    status : Status.LOADING,
    items : [],
    orderDetails : []
}


const orderSlice = createSlice({
    name : "adminorders",
    initialState,
    reducers : {
        setItems(state:IInitialState, action:PayloadAction<IAdminOrder[]>){
            state.items = action.payload
        },
        setOrderDetails(state:IInitialState, action:PayloadAction<IOrderDetail[]>){
            state.orderDetails = action.payload
        },
        setStatus(state:IInitialState, action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
    
})

export const {setItems, setStatus, setOrderDetails} = orderSlice.actions 
export default orderSlice.reducer


export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get("/order/all")
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

export function fetchAdminOrderDetails(id:string){
    return async function fetchAdminOrderDetailThunk(dispatch:AppDispatch){
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

// export function cancelOrderAPI(id:string){
//     return async function cancelOrderTAPIhunk(dispatch:AppDispatch){
//         console.log(id,"mero")
//         try {
//             const response = await APIWITHTOKEN.patch("/order/cancel-order/" + id)
//             console.log(response, "response")
//             if(response.status === 200){
//                 dispatch(updateOrderStatusToCancel({orderId : id}))
//                 dispatch(setStatus(Status.SUCCESS))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }