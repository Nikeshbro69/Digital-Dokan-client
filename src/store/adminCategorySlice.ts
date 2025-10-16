import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN, API } from "../http";


interface ICategory {
    id : string,
    categoryName : string
}
interface ICategoryInitialState{
    items : ICategory[],
    status : Status
}

const initialState:ICategoryInitialState = {
    items : [],
    status : Status.LOADING
}


const adminCategorySlice = createSlice({
    name : "categories",
    initialState,
    reducers : {
        setItems(state:ICategoryInitialState, action:PayloadAction<ICategory[]>){
            state.items = action.payload
        },
        addCategoryToItems(state:ICategoryInitialState, action:PayloadAction<ICategory>){
            state.items.push(action.payload)
        },
        setStatus(state:ICategoryInitialState, action:PayloadAction<Status>){
            state.status = action.payload
        },


        setDeleteCategoryItem(state:ICategoryInitialState, action:PayloadAction<string>){
            const index = state.items.findIndex(item =>item.id == action.payload)
            if(index !== -1){
                state.items.splice(index, 1)
            }
        },
        resetStatus(state:ICategoryInitialState){
            state.status = Status.LOADING
        }
    }
})

export const {setItems, setStatus, setDeleteCategoryItem, addCategoryToItems, resetStatus} = adminCategorySlice.actions
export default adminCategorySlice.reducer


export function addCategory(categoryName : string){
    return async function addToCategoryThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.post('/category',{categoryName})
            console.log(response.data.category)
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addCategoryToItems(response.data.category))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchCategory(){
    return async function fetchCategoryThunk(dispatch:AppDispatch){
        try {
            const response = await API.get('/category')
            if(response.status === 200){
                dispatch(setItems(response.data.categories))
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



export function handleCategoryDelete(categoryId:string){
    return async function handleCategoryDeleteThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete('/category/' + categoryId)

            if(response.status === 200){
                dispatch(setDeleteCategoryItem(categoryId))
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

