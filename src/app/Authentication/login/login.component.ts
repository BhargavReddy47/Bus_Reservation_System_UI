import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoginRequest } from './LoginRequest.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  async login() {

    if (!this.loginForm.valid) {
      alert('Invalid form. Please check the fields.');
      return;
    }

    const loginRequest: LoginRequest = this.loginForm.value;

    // Send customer data to the Spring Boot backend
    var loggedIn = await this.authService.login(loginRequest);

    if (loggedIn) {
      this.router.navigate(['/Home']);
    }
    else {
      alert('Invalid email or password');
    }
}

}
