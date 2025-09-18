import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/type";
import axios from "axios";
import type { AppDispatch } from "./store";


interface ILoginUser{
    email : "string",
    password : "string"
}

interface IUser{
        username : string | null,
        email : string | null,
        password : string | null
}
interface IAuthState{
    user : IUser,
    status : Status
}
const initialState:IAuthState = {
    user : {
        username : "",
        email : "",
        password : ""
    },
    status : Status.LOADING
}
const authSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers :{
        setUser(state:IAuthState, action:PayloadAction<IUser>){
            state.user = action.payload
        },
        setStatus(state:IAuthState, action:PayloadAction<Status>){
            state.status = action.payload
        }
    }
}) 

export const {setStatus, setUser} = authSlice.actions
export default authSlice.reducer


export function registerUser(data:IUser){
    return async function registerUserThunk(dispatch:AppDispatch){
        try {
            const response = await axios.post("http://localhost:4000/api/auth/register", data)
            if(response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUser(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function loginUser(data:ILoginUser){
    return async function loginUserThunk(dispatch:AppDispatch){
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", data)
            if(response.status === 201){
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

export function forgetPassword(data:{email:string}){
    return async function forgetPasswordThunk(dispatch:AppDispatch){
        try {
            const response = await axios.post("http://localhost:4000/api/auth/forget-password", data)
            if(response.status === 201){
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