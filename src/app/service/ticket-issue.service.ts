import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { TicketIssue } from '../models/ticket-issue';

@Injectable({
  providedIn: 'root'
})
export class TicketIssueService {
  // loginApi: string = "http://localhost:8080/trip/records";
   loginApi: string = "http://localhost:8080/ticket";
  httOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  getTripsByLocation(start: number, destination: number): Observable<TicketIssue[]> {
    const params = new HttpParams()
      .set('startLocation', start.toString())
      .set('destination', destination.toString())
    return this.http.get<TicketIssue[]>(this.loginApi, { params });
  }

  save(tickIssue: TicketIssue): Observable<TicketIssue> {
    return this.http.post<TicketIssue>(this.loginApi, tickIssue,this.httOptions);
  }

  getAllTickets(): Observable<TicketIssue[]> {
    return this.http.get<TicketIssue[]>(this.loginApi);
  }

  getTicketById(ticketId: number): Observable<TicketIssue> {
    return this.http.get<TicketIssue>(this.loginApi.concat('/').concat(ticketId + ''))
  }
}
