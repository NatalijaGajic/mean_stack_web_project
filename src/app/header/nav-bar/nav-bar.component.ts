import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/user-form/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  adminIsLogedIn = false;
  private authListeneSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListeneSub = this.userService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.adminIsLogedIn = this.userService.getAutor();
    this.userService.getAutorStatusListener().subscribe(isAutorizedAsAdmin => {
      this.adminIsLogedIn = isAutorizedAsAdmin;
    });
  }


  ngOnDestroy() {
    this.authListeneSub.unsubscribe();
  }

  onLogOut() {
    this.userService.logOut();
    // clears the token, informs interested components of change of auth status
  }



}
