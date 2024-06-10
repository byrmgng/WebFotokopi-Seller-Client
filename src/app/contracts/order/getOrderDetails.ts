import { GetOrderDetailsItem } from "./getOrderDetailsItem";

export class GetOrderDetails{
    orderID!:string
    customerName!:string;
    customerAddress!:string;
    customerPhoneNumber!:string;
    orderStatus!:number;
    price!:string;
    createdDate!:string;
    deliveryDate!:string;
    orderItems!:GetOrderDetailsItem[];
}