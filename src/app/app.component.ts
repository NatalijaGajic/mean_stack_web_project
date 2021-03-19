import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from './user-form/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.autoAuthUser();
    this.userService.autoAutorUser();
  }

}
