import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from './schedule.model';
import { SearchService } from '../services/search.service';
import { BookingRequest } from './bookingRequest.model';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})

export class SchedulesComponent implements OnInit {
  arrivalStopId: any;
  departureStopId: any;
  departureDate: any;
  schedulesResult: Schedule[] = [];
  scheduleToBook!: Schedule;
  ticket: any;
  seatsToBook: number = 1;

  calculate(): any {
  }

  constructor(private route: ActivatedRoute, private searchService: SearchService,
    private router: Router, private authService: AuthService, private bookingService: BookingService) {
  }

  onScheduleSelect(schedule: Schedule) {
    this.scheduleToBook = schedule;
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe((params) => {
        this.departureStopId = params['departureStopId'];
        this.arrivalStopId = params['arrivalStopId'];
        this.departureDate = params['departureDate'];

        if (!this.departureStopId || !this.arrivalStopId || !this.departureDate) {
          this.router.navigate(['/Home'], {
            queryParamsHandling: 'merge'
          });
          return;
        }

        this.searchService.searchSchedules(this.departureStopId, this.arrivalStopId, this.departureDate)
          .subscribe(res => {
            this.schedulesResult = res;

            if (this.schedulesResult)
              this.scheduleToBook = this.schedulesResult[0];
          });
      });
  }

  totalPrice(): number {
    return this.scheduleToBook.price * this.seatsToBook;
  }

  async book() {
    var bookingRequest: BookingRequest = {
      scheduleId: this.scheduleToBook.id,
      noOfSeats: this.seatsToBook,
      amountPaid: this.totalPrice(),
      customerId: this.authService.getLoggedInCustomer().id
    };

    var bookingResponse = await this.bookingService.book(bookingRequest);
    alert(`Booking confirmed with id: ${bookingResponse.id}`);
  }
}
