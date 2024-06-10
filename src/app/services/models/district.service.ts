import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, catchError } from 'rxjs';
import { ListDistrict } from '../../contracts/district/ListDistrict';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private httpClientService: HttpClientService) { }
  getCities(id:string): Observable<ListDistrict[]> {
    return this.httpClientService.get<ListDistrict[]>({
      controller: "district",
      queryString:"cityId="+id
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
}
