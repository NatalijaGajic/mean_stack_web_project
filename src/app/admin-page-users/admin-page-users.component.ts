import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../user-form/user-auth.model';
import { Subscribable, Subscription } from 'rxjs';
import { UserService } from '../user-form/user.service';

@Component({
  selector: 'app-admin-page-users',
  templateUrl: './admin-page-users.component.html',
  styleUrls: ['./admin-page-users.component.css']
})
export class AdminPageUsersComponent implements OnInit {

  searchText;
  users = [] as AuthData[];
  private userSubscription: Subscription;
  textSearch;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.getUsersListener().subscribe((users: AuthData[]) => {
      this.users = users;
    });
    this.userService.getUsers();
  }

  onDelete(id: string) {
    console.log('Calling onDelete user for:');
    console.log(id);
    this.userService.deleteUser(id);
  }

  onOrders() {
    this.router.navigate(['/admin/orders']);
  }

  onUsers() {
    this.router.navigate(['/admin/users']);
  }

  onProducts() {
    this.router.navigate(['/admin']);
  }


}
