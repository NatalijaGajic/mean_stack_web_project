import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-form-signup',
  templateUrl: './user-form-signup.component.html',
  styleUrls: ['./user-form-signup.component.css']
})
export class UserFormSignupComponent implements OnInit {

    form: FormGroup;
    formNotSubmitted = false;
    userAlreadyExist = false;
    logIn = false;

    constructor(public userService: UserService) { }

    ngOnInit() {
      this.form = new FormGroup({
        email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
        password: new FormControl (null, {validators: [Validators.required, Validators.minLength(4)]}),
      });
    }

    onSignUp() {
      console.log(this.form.value);
      console.log(this.form.value.email + this.form.value.password);
      if (this.form.invalid) {
        this.formNotSubmitted = true;
        this.userAlreadyExist = false;
      // this.ngOnInit();
        console.log('form is invalid');
        return;
      } else {
        this.formNotSubmitted = false;
        this.userService.getUser(this.form.value.email).subscribe(result => {
          console.log(result.found);
          this.userAlreadyExist = result.found;
          if (this.userAlreadyExist) {
            return;
        } else {
          // console.log('zasto ulazi');
          this.userService.createUser(this.form.value.email, this.form.value.password);
          this.logIn = true;
        }
        });


      }
    }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get notSubmitted() {
    return this.formNotSubmitted;
  }

  get alreadyExist() {
    return this.userAlreadyExist;
  }

  get login() {
    return this.logIn;
  }

}
