import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-form/user.service';

@Component({
  selector: 'app-footer-dark',
  templateUrl: './footer-dark.component.html',
  styleUrls: ['./footer-dark.component.css']
})
export class FooterDarkComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
