import { Component, OnInit } from '@angular/core';
import { StopService } from '../services/stop.service';
import { Stop } from '../schedules/stop.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allStops: Stop[] = [];
  arrivalStops: Stop[] = [];
  departureStops: Stop[] = [];
  arrivalStopId: any;
  departureStopId: any;
  departureDate: any;
  
  constructor(private route: ActivatedRoute, private stopService: StopService, private router: Router) {

  }

  getStops() {
    return of(this.stopService.getStops()
      .subscribe(s => {
        this.allStops = s;
        this.departureStops = s;
        this.arrivalStops = s;
      }));
  }

  search() {
    this.router.navigate(['/schedules'], {
      queryParams: {
        arrivalStopId: this.arrivalStopId,
        departureStopId: this.departureStopId,
        departureDate: this.departureDate
      }
    });
  }

  onDepartureStopChange(event: any) {
    this.arrivalStops = this.allStops.filter(s => s.id != this.departureStopId);
  }

  onArrivalStopChange(event: any) {
    this.departureStops = this.allStops.filter(s => s.id != this.arrivalStopId);
  }

  ngOnInit() {
    this.getStops()
    .subscribe(()=> {
      this.route.queryParams
      .subscribe((params) => {
        this.departureStopId = parseInt(params['departureStopId']);
        this.arrivalStopId = parseInt(params['arrivalStopId']);
        this.departureDate = params['departureDate'];
      });
    });    
  }

}
