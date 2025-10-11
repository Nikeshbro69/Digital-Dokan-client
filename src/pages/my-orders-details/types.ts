
export enum OrderStatus {
    Preparation = "preparation",
    Pending = "pending",
    Ontheway = "ontheway",
    Delivered = "delivered",
    Cancelled = "cancelled"
}
export enum PaymentMethod {
    Esewa = "esewa",
    Khalti = "khalti",
    COD = "cod"
 }

 export enum PaymentStatus {
    Paid = "paid",
    Unpaid = "unpaid"
 }

export interface IOrderDetail {
    "id": string,
    "quantity": number,
    "createdAt": string,
            
    "orderId": string,
    "productId": string,
    "order": {
        "orderStatus": OrderStatus,
        "addressLine": string,
        "state": string,
        "city": string,
        "totalAmount": number,
        "phoneNumber": string,
        "firstName" : string,
        "lastName" : string
        "payment": {
            "paymentMethod": PaymentMethod,
            "paymentStatus": PaymentStatus
        }
    },
    "product": {
        "productImageUrl": string,
        "productName": string,
        "productPrice": 3000,
        "category": {
            "categoryName": string,
         }
    }
}