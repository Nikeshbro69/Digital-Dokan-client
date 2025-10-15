import { useEffect, useState } from "react";
import Navbar from "../../globals/components/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMyOrders } from "../../store/checkoutSlice";
import { Link } from "react-router-dom";

function MyOrder(){

    const dispatch = useAppDispatch()
    const {items} = useAppSelector((store)=> store.orders)
    
    const [searchTerm, setSearchTerm] = useState<string>("")
    const newItems = items.filter((item)=>item?.id.toLowerCase().includes(searchTerm) || item.orderStatus?.toLowerCase().includes(searchTerm) || item?.payment?.paymentMethod.toLowerCase().includes(searchTerm) || item?.totalAmount == parseInt(searchTerm))
    useEffect(()=>{
        dispatch(fetchMyOrders())
    },[])


    return (
        <>
        <Navbar />
                <div className="flex flex-col">
        <div className=" overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
            <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
                <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                </div>
                <input type="text" id="default-search" className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search...." onChange={(e)=>setSearchTerm(e.target.value.toLowerCase())} />
            </div>
            <div className="overflow-hidden ">
                <table className=" min-w-full rounded-xl">
                <thead>
                    <tr className="bg-gray-50">
                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">Order Id</th>
                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Order Status</th>
                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Total Amount </th>
                    <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Payment Method </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 ">
                    {
                        newItems.length > 0 && newItems.map((item)=>{
                            return (
                                <tr className="bg-white transition-all duration-500 hover:bg-gray-50" key={item.id}>
                                <Link to={`/my-orders/${item.id}`}>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{item?.id}</td>
                                </Link>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item.orderStatus}</td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {item?.totalAmount}</td>
                                <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{item?.payment?.paymentMethod}</td>
                               
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>

        </>
    )
}

export default MyOrder