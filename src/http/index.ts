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

export default API