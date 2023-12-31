import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  register(Customer: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, Customer);
  }
}