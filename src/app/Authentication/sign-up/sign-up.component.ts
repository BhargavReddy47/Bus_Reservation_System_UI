import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from './Customer.model'; // Adjust the path as needed

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  registrationForm: FormGroup;
  
  



  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    }, {
      validator:this.passwordMatchValidator // Custom validator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    // Check if passwords match
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

  register() {
    if (!this.registrationForm.valid) {
      alert('Invalid form. Please check the fields.');
      return;
    }

    const customer: Customer = this.registrationForm.value;

    // Send customer data to the Spring Boot backend
    this.http.post('http://localhost:8081/register', customer)
      .subscribe({
        next: (response:object)=> {
          console.log('Customer registered successfully:', response);
          alert('Registration successful! You will be navigated to the login page. Enter your Email Id and password for authentication.');
          this.router.navigate(['/login']);
        },
        error: (error:object) => {
          console.error('Error during registration:', error);
          alert('Error during registration. Please try again.');
        }
      });
  }
}