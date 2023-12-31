import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Booking } from '../schedules/booking.model';
import { BookingRequest } from '../schedules/bookingRequest.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private baseUrl = 'http://localhost:8081'; // Update with your backend URL

    constructor(private http: HttpClient, private authService: AuthService) { }

    book(booking: BookingRequest): Promise<Booking> {
        const url = `${this.baseUrl}/book`;
        return new Promise(resolve => {
            this.http.post<Booking>(url, booking)
            .pipe(retry(1), catchError(this.handleError))
            .subscribe(res=> resolve(res));
        });
    }

    getBookings(): Observable<Booking[]>{
        const url = `${this.baseUrl}/bookings?customerId=${this.authService.getLoggedInCustomer().id}`;
        return this.http.get<Booking[]>(url);
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = 'An error occurred:' + error.error.message;
        } 
        return throwError(() => {
            return errorMessage;
        });
    };
}