import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seat } from '../models/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  api:string="http://localhost:8080/seat";

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  saveSeat(seat:Seat):Observable<Seat>{
    return this.http.post<Seat>(this.api,seat,this.httpOptions);
  }

  getSeat():Observable<Seat[]>{
    return this.http.get<Seat[]>(this.api,this.httpOptions);
  }

  getSeatById(id:number):Observable<Seat>{
    return this.http.get<Seat>(this.api.concat("/").concat(id+''))
  }
}
