import { createSlice } from "@reduxjs/toolkit";
import {Status} from "../globals/types/type"
import type { IProducts, IProduct } from "../pages/product/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import API from "../http";

const initialState:IProducts = {
    products : [],
    status : Status.LOADING,
    product : null
}


const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setProducts(state:IProducts, action:PayloadAction<IProduct[]>){
            state.products = action.payload
        },

        setStatus(state:IProducts, action:PayloadAction<Status>){
            state.status = action.payload
        },
        setProduct(state:IProducts, action:PayloadAction<IProduct>){
            state.product = action.payload
        },
    }

})

export const {setProducts, setStatus, setProduct} = productSlice.actions
export default productSlice.reducer


export function fetchProducts(){
    return async function fetchProductsThunk(dispatch : AppDispatch){
        try {
            const response = await API.get("/product")
            console.log(response);
            if(response.status === 200){
                dispatch(setProducts(response.data.data))
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


export function fetchProduct(id:string){
    return async function fetchProductsThunk(dispatch : AppDispatch, getState:()=>RootState){
        const store = getState()
        const productExists = store.products.products.find((product)=> product.id === id) //gives output as boolean either true or false
        if(productExists){
            dispatch(setProduct(productExists))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            try {
                const response = await API.get("/product/" + id)
                console.log(response);
                console.log(response)
                if(response.status === 200){
                    
                    dispatch(setStatus(Status.SUCCESS))
                    dispatch(setProduct(response.data.data.length > 0 && response.data.data[0]))
                }else{
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                console.log(error);
                dispatch(setStatus(Status.ERROR))
            }
        }
    }

}