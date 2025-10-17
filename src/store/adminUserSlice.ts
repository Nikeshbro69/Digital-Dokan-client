import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import { APIWITHTOKEN, API } from "../http";



export interface IUser {
    id : string,
    username : string,
    email : string
}
interface IUserInitialState{
    users : IUser[],
    status : Status
}

const initialState:IUserInitialState = {
    users : [],
    status : Status.LOADING
}


const userSlice = createSlice({
    name : "users",
    initialState,
    reducers : {
        setUsers(state:IUserInitialState, action:PayloadAction<IUser[]>){
            state.users = action.payload
        },
        setStatus(state:IUserInitialState, action:PayloadAction<Status>){
            state.status = action.payload
        },
        deleteUser(state:IUserInitialState, action:PayloadAction<string>){
            const index = state.users.findIndex((user)=>user?.id === action.payload)
            if(index !== -1){
                state.users.splice(index, 1)
            }
        }
    }
})

export const {setUsers, setStatus, deleteUser} = userSlice.actions
export default userSlice.reducer




export function fetchUsers(){
    return async function fetchUsersThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.get('/auth/users')
            if(response.status === 200){
                dispatch(setUsers(response.data.data))
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


export function deleteUserById(id:string){
    return async function deleteUserByIdThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete('/auth/users/' + id)
            if(response.status === 200){
                dispatch(deleteUser(id))
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



