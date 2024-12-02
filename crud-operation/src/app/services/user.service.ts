import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = 'http://localhost:3000/user';
  
  constructor(private http: HttpClient) { }

  public getUserList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  public addUser(userObject: any): Observable<any> {
    return this.http.post(this.apiUrl, userObject);
  }

  public removeUser(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }
  public getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  public updateUser(id: string, userObject: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userObject);
  }

}
