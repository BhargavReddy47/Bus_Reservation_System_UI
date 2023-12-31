import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Stop } from '../schedules/stop.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  @Input('departure') departure!: Stop;
  @Input('arrival') arrival!: Stop;

  constructor(private router:Router) { }

  getStopDisplay(stop: Stop): string {
    return stop.stopName + ", " + stop.arrivalCity;
  }

  onModifySearch(){
    this.router.navigate(['/Home'], {
      queryParamsHandling: 'merge'
    });
  }
}


