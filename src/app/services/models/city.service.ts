import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { ListCity } from '../../contracts/city/ListCity';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClientService: HttpClientService) { }
  getCities(): Observable<ListCity[]> {
    return this.httpClientService.get<ListCity[]>({
      controller: "city",
    }).pipe(
      catchError(errorResponse => {
        throw errorResponse.message;
      })
    );
  }
}
