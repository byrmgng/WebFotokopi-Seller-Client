import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Seller } from '../../entities/seller';
import { CreateSeller } from '../../contracts/seller/createSeller';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { LoginSeller } from '../../contracts/seller/loginSeller';
import { CustomToastrService, ToastrMessageType, ToastrPositon } from '../custom-toastr.service';
import { GetSellerAccountInfo } from '../../contracts/seller/getSellerAccountInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateSellerAddress } from '../../contracts/seller/updateSellerAddress';
import { BaseResponse } from '../../contracts/BaseResponse';
import { UpdateSeller } from '../../contracts/seller/updateSeller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private httpClientService: HttpClientService, private toastr:CustomToastrService, private httpService:HttpClient) { }
  async createSeller(seller : Seller):Promise<CreateSeller> {
    const observeble: Observable<CreateSeller | Seller> = this.httpClientService.post<CreateSeller | Seller>({
      controller:"Seller",
      action:"CreateSeller"
    },seller);
    return await firstValueFrom(observeble) as CreateSeller;
  }
  async loginSeller(mailorPhoneNumber:string,password:string):Promise<LoginSeller>{
    const observeble:Observable<any | LoginSeller> = this.httpClientService.post<any | LoginSeller>({
      controller:"Seller",
      action:"LoginSeller",
    },{mailorPhoneNumber,password})
    const result =await firstValueFrom(observeble) as LoginSeller;
    if(result.succeeded){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
      this.toastr.ShowMessage(result.message,"Giriş Başarılı",ToastrMessageType.Success,ToastrPositon.TopRight);
    }
    return result;
  }
  async refreshTokenLoginSeller(refreshToken:string):Promise<boolean>{
    const observeble:Observable<any | LoginSeller> = this.httpClientService.post<any | LoginSeller>({
      controller:"Seller",
      action:"RefreshTokenLoginSeller",
    },{refreshToken})
    const result =await firstValueFrom(observeble) as LoginSeller;
    if(result.succeeded){
      localStorage.setItem("accessToken",result.token.accessToken);
      localStorage.setItem("refreshToken",result.token.refreshToken);
    }
    return result.succeeded;
  }

  GetSellerAccountInfo(): Observable<GetSellerAccountInfo> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<GetSellerAccountInfo>({
      controller: "Seller",
      action:"GetSellerAccountInfo",
      headers:headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );

  }
  async UpdateSellerAddress(data : UpdateSellerAddress):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<UpdateSellerAddress | BaseResponse> = this.httpClientService.put<UpdateSellerAddress | BaseResponse>({
      controller:"Seller",
      action:"UpdateSellerAddress",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async UpdateSeller(data : UpdateSeller):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<UpdateSeller | BaseResponse> = this.httpClientService.put<UpdateSeller | BaseResponse>({
      controller:"Seller",
      action:"UpdateSeller",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async UpdateSellerLogo(data:FormData): Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': accessToken ? accessToken : '',
    });
    const observeble: Observable<BaseResponse | FormData> = this.httpService.put<BaseResponse | FormData>('https://localhost:7025/api/Seller/UpdateSellerLogo',data, { headers: headers });
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async UpdateSellerLogo2(data:FormData): Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': accessToken ? accessToken : '',
    });
    const observeble: Observable<BaseResponse | FormData> = this.httpService.put<BaseResponse | FormData>('https://localhost:7025/api/Seller/UpdateSellerLogo2',data, { headers: headers });
    return await firstValueFrom(observeble) as BaseResponse;
  }

}