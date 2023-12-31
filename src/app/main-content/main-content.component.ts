import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit{
  
    isAuthenticated = false;
  
    constructor(private AuthService:AuthService) {}
  
    ngOnInit(): void {
      this.AuthService.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    }
    
  }


