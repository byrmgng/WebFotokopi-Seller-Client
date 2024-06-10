import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl:string) {
    
  }
  private url(requestParameters:Partial<RequestParameters>){
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/api/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }
  get<T>(requestParameter:Partial<RequestParameters>,id?:string):Observable<T>{
    let url:string= "";
    if(requestParameter.fullEndPoints)
      url = requestParameter.fullEndPoints;
    else
      url=`${this.url(requestParameter)}${id?`/${id}`:""}${requestParameter.queryString? "?" + requestParameter.queryString:""}`;
    return this.httpClient.get<T>(url,{headers:requestParameter.headers});  
  }
  post<T>(requestParameter:Partial<RequestParameters>,body: Partial<T> ):Observable<T>{
    let url:string="";
    if(requestParameter.fullEndPoints)
      url = requestParameter.fullEndPoints;
    else
      url=`${this.url(requestParameter)}${requestParameter.queryString?"?"+requestParameter.queryString:""}`;
    return this.httpClient.post<T>(url,body,{headers:requestParameter.headers});
  }

  put<T>(requestParameter:Partial<RequestParameters>,body: Partial<T> ):Observable<T>{
    let url:string="";
    if(requestParameter.fullEndPoints)
      url = requestParameter.fullEndPoints;
    else
      url=`${this.url(requestParameter)}${requestParameter.queryString ? "?"+requestParameter.queryString : ""}`;
    return this.httpClient.put<T>(url,body,{headers:requestParameter.headers});
  }
  delete<T>(requestParameter:Partial<RequestParameters>,id:string):Observable<T>
  {
    let url:string="";
    if(requestParameter.fullEndPoints)
      url = requestParameter.fullEndPoints;
    else
      url=`${this.url(requestParameter)}${id?`?id=${id}`:""}${requestParameter.queryString ? "?"+ requestParameter.queryString : ""}`;
    return this.httpClient.delete<T>(url,{headers:requestParameter.headers});  
  }
}
export class RequestParameters{
  controller?:string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoints?:string;
  queryString?:string;
}
