import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location';

  constructor(private http: HttpClient) { }

  //muestra regiones
  getRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/region`);
  }

  //muestra las comunas de la region
  getComunas(regionId: number): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/comuna/${regionId}`)
      .pipe(
        map((response: any) => response.data.map((item: any) => item.nombre))
      );
  }
  
}
