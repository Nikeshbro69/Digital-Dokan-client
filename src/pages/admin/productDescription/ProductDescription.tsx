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
            
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={`http://localhost:4000/${product?.productImageUrl}`} alt="Product Image" />
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product?.productName}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4"></p>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Price:  </span>
                                    <span className="text-gray-600 dark:text-gray-300">{product?.productPrice}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Availability(In Stock):  </span>
                                    <span className="text-gray-600 dark:text-gray-300">{product?.productTotalStock}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{product?.productDescription}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ProductDescription