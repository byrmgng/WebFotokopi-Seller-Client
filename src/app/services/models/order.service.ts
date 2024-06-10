import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { GetOrderDetails } from '../../contracts/order/getOrderDetails';
import { FilterOrder } from '../../contracts/order/filterOrder';
import { BaseResponse } from '../../contracts/BaseResponse';
import { UpdateOrderStatus } from '../../contracts/order/updateOrderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }
  getAllOrderDetails(): Observable<GetOrderDetails[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<GetOrderDetails[]>({
      controller: "Order",
      action:"GetOrderDetailsForSeller",
      headers:headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
  FilterOrder(data: FilterOrder): Observable<GetOrderDetails[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.put<GetOrderDetails[]|any>({
      controller: "Order",
      action: "GetOrderDetailsForSellerFilter",
      headers: headers
    }, data).pipe(
      map(response => {
        return response; // If no transformation is needed, simply return the response
      })
    );
  }
  async UpdateOrderStatus(data: UpdateOrderStatus): Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<UpdateOrderStatus | BaseResponse> = this.httpClientService.put<UpdateOrderStatus|any | BaseResponse>({
      controller: "Order",
      action: "UpdateOrderStatus",
      headers: headers
    }, data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
}
