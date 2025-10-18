import { useEffect } from "react"
import AdminLayout from "../AdminLayout"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { useParams } from "react-router-dom"
import { fetchProductAdmin } from "../../../store/adminProductSlice"






function ProductDescription(){
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {product} = useAppSelector((store)=>store.adminProducts)
    useEffect(()=>{
       id && dispatch(fetchProductAdmin(id))
    },[])
    console.log(product)
    return(
        <AdminLayout>
            <h1>Product Description</h1>
        </AdminLayout>
    )
}

export default ProductDescription