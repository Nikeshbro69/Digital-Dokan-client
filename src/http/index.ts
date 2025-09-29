import axios from 'axios'

const API = axios.create({
    baseURL : "http://localhost:4000/api", 
    headers : {
        // request headers type json
        "Content-Type" : "application/json", 

        // response type json 
        "Accept" : "application/json" 
    }
})

const APIWITHTOKEN = axios.create({
    baseURL : "http://localhost:4000/api", 
    headers : {
        // request headers type json
        "Content-Type" : "application/json", 

        // response type json 
        "Accept" : "application/json" ,
        "Authorization " : localStorage.getItem("token")
    }
})



export {API, APIWITHTOKEN}