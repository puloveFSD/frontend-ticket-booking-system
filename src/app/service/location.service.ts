import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { TreeError } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  api: string = "http://localhost:8080/location"
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(this.api.concat("/").concat(id + ''));
  }

  saveLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.api, location, { responseType: 'text' as 'json' });
  }

  updateLocation(locationId: number, location: Location): Observable<string> {
    return this.http.put<string>(this.api.concat('/').concat(locationId + ''), location, { responseType: 'text' as 'json' })
  }
  getLocationList(): Observable<Location[]> {
    return this.http.get<Location[]>(this.api, this.httpOptions);
  }
  deleteLocation(locationId: number): Observable<string> {
    return this.http.delete<string>(this.api.concat('/').concat(locationId + ''),{responseType:'text'as 'json'});
  }
}
