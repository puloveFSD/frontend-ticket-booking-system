import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  api: string = "http://localhost:8080/bus";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  getBusList(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.api, this.httpOptions);
  }

  saveBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.api, bus, this.httpOptions);
  }
  deleteBus(busId: number): Observable<string> {
    return this.http.delete<string>(this.api.concat('/').concat(busId + ''), { responseType: 'text' as 'json' });
  }
  getBusById(id: number): Observable<Bus> {
    return this.http.get<Bus>(this.api.concat("/").concat(id + ''))
  }
  updateBus(busId: number, bus: Bus): Observable<string> {
    return this.http.put<string>(this.api.concat('/').concat(busId + ''), bus, { responseType: 'text' as 'json' });
  }
}
