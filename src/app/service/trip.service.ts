import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { SrvRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  api: string = "http://localhost:8080/trip";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getTripList(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.api, this.httpOptions);
  }

  saveTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.api, trip, this.httpOptions);
  }
  deleteTrip(tripId: number): Observable<string> {
    return this.http.delete<string>(this.api.concat("/").concat(tripId + ''), { responseType: 'text' as 'json' })
  }
  getTripById(tripId: number): Observable<Trip> {
    return this.http.get<Trip>(this.api.concat('/').concat(tripId + ''));
  }
  updateTrip(tripId: number, trip: Trip): Observable<string> {
    return this.http.put<string>(this.api.concat('/').concat(tripId + ''), trip, { responseType: 'text' as 'json' })
  }
}
