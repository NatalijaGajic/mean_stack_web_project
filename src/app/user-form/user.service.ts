import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './user-auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../ordering-info/order.service';
import { AuthInterceptor } from './auth-interceptor';


@Injectable({providedIn: 'root'})
export class UserService {

  private token: string;
  private isAuthenticated = false;
  private authStatusLIstener = new Subject<boolean>();
  private autorStatusListener = new Subject<boolean>();
  private users: AuthData[] = [];
  private usersUpdated = new Subject<AuthData[]>();
  private adminLogedIn = false;
  private tokenTimer: any;
  errorStatus = new Subject<{ message: string }>();

  constructor(private http: HttpClient, private router: Router, private cartService: CartService, private orderService: OrderService) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {_id: null, email, password};
    this.http.post<{message: string, userID: string,  userEmail: string,
      userPassword: string}>('http://localhost:3000/api/users/signup', authData)
    .subscribe(response => {
      authData._id = response.userID;
      console.log(response);
    });
  }

  deleteUser(id: string) {
  this.http.delete('http://localhost:3000/api/users/' + id).subscribe(() => {
    console.log('User is deleted');
    const updatedUsersDelete = this.users.filter(post => post._id !== id);
    this.users = updatedUsersDelete;
    this.usersUpdated.next([...this.users]);
  });
  }

  getAuthStatusListener() {
    return this.authStatusLIstener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAutor() {
    return this.adminLogedIn;
  }

  getErrorStatusListener() {
    return this.errorStatus.asObservable();
  }

  getAutorStatusListener() {
    return this.autorStatusListener.asObservable();
  }

  logInUser(email: string, password: string ) {
    const authData: AuthData = {_id: null, email, password};
    console.log('In logInUser authdata: ' + authData.email + authData.password);
    this.http.post<{token: string, expiresIn: number,
      logedInUserID: string}>('http://localhost:3000/api/users/login', authData).subscribe(response => {
        console.log(response);
        console.log(response + 'token which is sent to the header later on is:' + response.token);
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration =  response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusLIstener.next(true);
          const now = new Date();
          const adminID = '5d5a64fd0caff92080bed863';
          const expirationDateCalculated = new Date(now.getTime() + expiresInDuration * 1000);
           // check if admin is logged in
          const userID = response.logedInUserID;
          this.adminLogedIn = false;
          if (userID === adminID) {
            this.adminLogedIn = true;
          }
          console.log('IDs:');
          console.log(userID);
          console.log(adminID);
          // console.log(expirationDateCalculated);
          this.saveAuthData(token, expirationDateCalculated);
          this.saveAutorData(this.adminLogedIn);
          if (this.adminLogedIn) {
            this.router.navigate(['/admin']);
          } else {
            // this.router.navigate(['/products']);
              this.router.navigate(['/products']);
               // window.history.back();

          }
        }
      }, error => {
        console.log(error);
        console.log(error.error.message);
        this.errorStatus.next({
          message: error.error.message
        });
      });
  }

  private saveAutorData(adminLogedIn: boolean) {
    if (adminLogedIn) {
      localStorage.setItem('admin', 'admin');
    }
  }

  private clearAutorData() {
    localStorage.removeItem('admin');
  }

  autoAuthUser() {
    const atuhInformation = this.getAuthData();
    if (!atuhInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = atuhInformation.expirationDate.getTime() - now.getTime();
    console.log(atuhInformation);
    if (expiresIn > 0 ) {
      this.token = atuhInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusLIstener.next(true);
    }
  }

  autoAutorUser() {
    const autorInformation = this.getAutorData();
    if (!autorInformation) {
      return;
    }
    this.adminLogedIn = true;
    this.autorStatusListener.next(true);
  }

  setAuthTimer(duration: number) {
    console.log('Setting timer' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

logOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.adminLogedIn = false;
    this.authStatusLIstener.next(false);
    this.cartService.emptyCart();
    this.orderService.emptyOrders();
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.clearAutorData();
    this.router.navigate(['/']);
  }

getToken() {
    console.log('token is being sent to by getToken in user.service' + this.token);
    return this.token;
  }

getUsers() {
    this.http.get<{ message: string, users: AuthData[] }>('http://localhost:3000/api/users').subscribe((responseData) => {
        this.users = responseData.users;
        this.usersUpdated.next([...this.users]);
    });
  }

  getUser(email: string) {
    return this.http.get<{found: boolean}>('http://localhost:3000/api/users/' + email);
  }

getUsersListener() {
    return this.usersUpdated.asObservable();
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  private getAutorData() {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      return;
    }
    return admin;
  }

}
