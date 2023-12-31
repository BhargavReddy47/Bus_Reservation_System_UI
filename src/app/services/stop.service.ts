import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stop } from '../schedules/stop.model';

@Injectable({
    providedIn: 'root'
})
export class StopService {

    private baseUrl = 'http://localhost:8081'; // Update with your backend URL

    constructor(private http: HttpClient) { }

    getStops(): Observable<Stop[]> {
        const url = `${this.baseUrl}/stops`;
        return this.http.get<Stop[]>(url);
    }

}