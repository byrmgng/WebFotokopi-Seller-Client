import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';
import { GetFilterFileResquest } from '../../contracts/file/getFilterFileRequest';
import { GetFilterFileResponse } from '../../contracts/file/getFilterFileResponse';
import { GetByIdFile } from '../../contracts/file/getByIdFile';
import { UpdateFile } from '../../contracts/file/updateFile';
import { BaseResponse } from '../../contracts/BaseResponse';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpService: HttpClient,private httpClientService:HttpClientService) {
    
   }
   async createFile(data:FormData): Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders({
      'Authorization': accessToken ? accessToken : '',
    });
    const observeble: Observable<BaseResponse | FormData> = this.httpService.post<BaseResponse | FormData>('https://localhost:7025/api/File/CreateFile',data, { headers: headers });
    return await firstValueFrom(observeble) as BaseResponse;

  }
  FilterFile(data: GetFilterFileResquest): Observable<GetFilterFileResponse[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.put<GetFilterFileResponse[]|any>({
      controller: "File",
      action: "GetFile",
      headers: headers
    }, data).pipe(
      map(response => {
        return response;
      })
    );
  }
  async GetByIdFileAsync(id : string):Promise<GetByIdFile> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<GetByIdFile | object> = this.httpClientService.put<GetByIdFile | object>({
      controller:"File",
      action:"GetByIdFile",
      headers:headers
    },{id});
    return await firstValueFrom(observeble) as GetByIdFile;
  }
  async updateFileAsync(data : UpdateFile):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<UpdateFile | object> = this.httpClientService.put<UpdateFile | object>({
      controller:"File",
      action:"UpdateFile",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }
  async deletePackage(data : string):Promise<BaseResponse> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<BaseResponse | string> = this.httpClientService.delete<BaseResponse | string>({
      controller:"File",
      action:"DeleteFile",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as BaseResponse;
  }

}
