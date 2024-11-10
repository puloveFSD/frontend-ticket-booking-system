import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginApi: string = "http://localhost:8080/user";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginApi.concat('/login'), user, this.httpOptions);
  }
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.loginApi, user, this.httpOptions);
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.loginApi, this.httpOptions);
  }
  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>(this.loginApi.concat('/').concat(userId + ''), { responseType: 'text' as 'json' });
  }
  updateUser(userId:number, user:User):Observable<string>{
    return this.http.put<string>(this.loginApi.concat('/').concat(userId+''),user,{responseType:'text'as 'json'})
  }
  getUserById(userId:number):Observable<User>{
    return this.http.get<User>(this.loginApi.concat('/').concat(userId+''))
  }
}
