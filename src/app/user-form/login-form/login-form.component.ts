import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public errorMessage = '';
  private error = true;
  private formNotSubmitted = false;
  constructor(private userService: UserService) { }

  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl (null, {validators: [Validators.required]}),
    });
    this.userService.getErrorStatusListener().subscribe(errorData => {
      console.log('error:');
      console.log(errorData.message);
      this.error = true;
      this.errorMessage = errorData.message;
    });
  }

  onLogIn() {
    if (this.form.invalid) {
      console.log('form is invalid');
      this.formNotSubmitted = true;
      this.error = false;
      return;
    }
    this.error = false;
    this.formNotSubmitted = false;
    this.userService.logInUser(this.form.value.email, this.form.value.password);
    console.log('value of the form:' + this.form.value.email + this.form.value.password);

  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get getError() {
    return this.error;
  }

  get notSubmitted() {
    return this.formNotSubmitted;
  }
}
