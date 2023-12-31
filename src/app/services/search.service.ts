import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../schedules/schedule.model';
import { Stop } from '../schedules/stop.model';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private baseUrl = 'http://localhost:8081'; // Update with your backend URL

    constructor(private http: HttpClient) { }

    searchSchedules(departureStopId: number, arrivalStopId: number, departureDate: string): Observable<Schedule[]> {
        const url = `${this.baseUrl}/search?departureStopId=${departureStopId}&arrivalStopId=${arrivalStopId}&departureDate=${departureDate}`;
        return this.http.get<Schedule[]>(url);
    }

}