import { Component, OnInit } from '@angular/core';
import { Customer } from '../Authentication/sign-up/Customer.model';
import { Booking } from '../schedules/booking.model';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-show-ticket',
  templateUrl: './show-ticket.component.html',
  styleUrls: ['./show-ticket.component.css']
})


export class ShowTicketComponent implements OnInit {
  bookings: Booking[] = [];
  customer: Customer;

  constructor(private bookingService: BookingService, private authService: AuthService) {
    this.customer = authService.getLoggedInCustomer();
  }

  ngOnInit() {
    this.bookingService.getBookings()
      // this.bookings[0].schedule.departureDateTime.getDay()
      .subscribe(res => this.bookings = res);
  }

  getFormatedDate(date: Date) {
    const datePipe: DatePipe = new DatePipe('en-IN');
    let formattedDate = datePipe.transform(date, 'dd MMM YYYY');
    return formattedDate;
  }
}
