import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { PackageFeature } from '../../contracts/Package/PackageFeatures';
import { HttpHeaders } from '@angular/common/http';
import {  PostPackage } from '../../entities/postPackage';
import { CreatePackage } from '../../contracts/Package/CreatePackage';
import { GetPackage } from '../../entities/getPackage';
import { DeletePackage } from '../../contracts/Package/DeletePackage';
import { UpdatePackage } from '../../contracts/Package/UpdatePackage';
import { PutPackage } from '../../entities/putPackage';
import { FilterPackage } from '../../entities/filterPackage';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private httpClientService: HttpClientService) { }
  getFeatures(): Observable<PackageFeature[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<PackageFeature[]>({
      controller: "Package",
      action:"GetPackageFeatures",
      headers:headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
  async createPackage(data : PostPackage):Promise<CreatePackage> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<CreatePackage | PostPackage> = this.httpClientService.post<CreatePackage | PostPackage>({
      controller:"Package",
      action:"CreatePackage",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as CreatePackage;
  }
  getAllPackage(): Observable<GetPackage[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.get<GetPackage[]>({
      controller: "Package",
      action:"GetAllPackage",
      headers:headers
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
  async deletePackage(data : string):Promise<DeletePackage> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<DeletePackage | string> = this.httpClientService.delete<DeletePackage | string>({
      controller:"Package",
      action:"DeletePackage",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as DeletePackage;
  }
  async UpdatePackage(data : PutPackage):Promise<UpdatePackage> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    const observeble: Observable<UpdatePackage | PutPackage> = this.httpClientService.put<UpdatePackage | PutPackage>({
      controller:"Package",
      action:"UpdatePackage",
      headers:headers
    },data);
    return await firstValueFrom(observeble) as UpdatePackage;
  }
  FilterPackage(data: FilterPackage): Observable<GetPackage[]> {
    const accessToken = "Bearer " + localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set('Authorization', accessToken ? accessToken : '');
    return this.httpClientService.put<GetPackage[]|any>({
      controller: "Package",
      action: "GetFilterPackage",
      headers: headers
    }, data).pipe(
      map(response => {
        return response; // If no transformation is needed, simply return the response
      })
    );
  }
 
}
