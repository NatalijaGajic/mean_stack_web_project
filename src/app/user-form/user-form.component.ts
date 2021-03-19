import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @ViewChild('closeButton', {static: true}) private closeButton: ElementRef;
  constructor(public userService: UserService) {}

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    if (form.invalid) {
      console.log('form is invalid');
      return;
    }
    this.userService.logInUser(form.value.email, form.value.password);
    console.log('value of the form:' + form.value.email + form.value.password);
    this.closeButton.nativeElement.click();

}

}
