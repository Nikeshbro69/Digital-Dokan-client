import { createSlice } from "@reduxjs/toolkit";
import {Status} from "../globals/types/type"
import type { IProducts, IProduct } from "../pages/product/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./store";
import API from "../http";

const initialState:IProducts = {
    products : [],
    status : Status.LOADING
}


const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setProduct(state:IProducts, action:PayloadAction<IProduct[]>){
            state.products = action.payload
        },

        setStatus(state:IProducts, action:PayloadAction<Status>){
            state.status = action.payload
        }
    }

})

export const {setProduct, setStatus} = productSlice.actions
export default productSlice.reducer


export function fetchProducts(){
    return async function fetchProductsThunk(dispatch : AppDispatch){
        try {
            const response = await API.get("/product")
            console.log(response);
            if(response.status === 200){
                dispatch(setProduct(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR))
        }
    }

}