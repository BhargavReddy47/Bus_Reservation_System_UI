import { booleanAttribute, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable, of, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoginRequest } from '../Authentication/login/LoginRequest.model';
import { Customer } from '../Authentication/sign-up/Customer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private loggedInCustomerSubject = new BehaviorSubject<Customer>({} as any);

  // Expose only the observable to the outside world
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) {

  }

  login(loginRequest: LoginRequest): Promise<boolean> {
    return new Promise(resolve => {
      this.http.post('http://localhost:8081/login', loginRequest)
        .pipe(retry(1), catchError(this.handleError))
        .subscribe({
          next: (response: object) => {
            this.isAuthenticatedSubject.next(true);
            this.loggedInCustomerSubject.next(response as Customer);
            resolve(this.isAuthenticated());
          },
          error: () => {
            resolve(false);
          }
        });
    });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An error occurred:' + error.error.message;
    } else if (error.status != HttpStatusCode.Unauthorized) {
      errorMessage = 'Something went wrong; please try again later.';
    }
    this.isAuthenticatedSubject.next(false);

    return throwError(() => {
      return errorMessage;
    });
  };

  logout() {
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  getLoggedInCustomer():Customer{
    return this.loggedInCustomerSubject.value;
  }
}