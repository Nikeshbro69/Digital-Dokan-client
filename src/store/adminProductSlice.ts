import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { API, APIWITHTOKEN} from "../http";
import type { IProduct } from "../pages/admin/products/components/ProductModal";
import type { RootState } from "./store";



export interface IProductAdmin {
    id : string,
    productName : string,
    productPrice : number,
    productTotalStock : number,
    productDescription : string,
    productImageUrl : string,
    discount : number,
    createdAt : string,
    categoryId : string,
    Category : {
        categoryName : string
    }

}
interface IProductInitialState{
    products : IProductAdmin[],
    status : Status,
    product : null | IProductAdmin
}

const initialState:IProductInitialState = {
    products : [],
    status : Status.LOADING,
    product : null
}


const productSlice= createSlice({
    name : "adminproducts",
    initialState,
    reducers : {
        setProducts(state:IProductInitialState, action:PayloadAction<IProductAdmin[]>){
            state.products = action.payload
        },
        setStatus(state:IProductInitialState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        // deleteUser(state:IUserInitialState, action:PayloadAction<string>){
        //     const index = state.users.findIndex((user)=>user?.id === action.payload)
        //     if(index !== -1){
        //         state.users.splice(index, 1)
        //     }
        // }

        addProductToProducts(state:IProductInitialState, action:PayloadAction<IProductAdmin>){
            state.products.push(action.payload)
        },
        setProduct(state:IProductInitialState, action:PayloadAction<IProductAdmin>){
                    state.product = action.payload
        }
    }
})

export const {setProducts, setStatus,addProductToProducts, setProduct} = productSlice.actions
export default productSlice.reducer




export function fetchProducts(){
    return async function fetchProductsThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get('/product')
            if(response.status === 200){
                dispatch(setProducts(response.data.data))
                // dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function addProduct(data: IProduct){
    return async function fetchProductsThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.post('/product',data, {
                headers : { 
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response.status === 200){
                dispatch(addProductToProducts(response.data.data))
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

export function fetchProductAdmin(id:string){
    return async function fetchProductAdminThunk(dispatch : AppDispatch, getState:()=>RootState){
        const store = getState()
        const productExists = store.adminProducts.products.find((product:IProductAdmin)=> product.id === id) //gives output as boolean either true or false
        if(productExists){
            dispatch(setProduct(productExists))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            try {
                const response = await API.get("/product/" + id)
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

// export function deleteUserById(id:string){
//     return async function deleteUserByIdThunk(dispatch:AppDispatch){
//         try {
//             const response = await APIWITHTOKEN.delete('/auth/users/' + id)
//             if(response.status === 200){
//                 dispatch(deleteUser(id))
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