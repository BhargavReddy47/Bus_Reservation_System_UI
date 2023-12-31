import { Component, OnInit } from '@angular/core';
import { Customer } from '../Authentication/sign-up/Customer.model'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: Customer | any;

  constructor(private authService: AuthService) {
    this.user = authService.getLoggedInCustomer();
  }


}