import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../product-more-info/order.model';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart/cart.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordering-info',
  templateUrl: './ordering-info.component.html',
  styleUrls: ['./ordering-info.component.css']
})
export class OrderingInfoComponent implements OnInit {

  form: FormGroup;
  public errorMessage = '';
  private submitted = false;
  private error = false;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.submitted = false;
    this.error = false;
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      address: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required, Validators.pattern('^[0-9]{10}$')]}),
      state: new FormControl(null, {validators: [Validators.required]}),
      city: new FormControl(null, {validators: [Validators.required]}),
      zip: new FormControl(null, {validators: [Validators.required, Validators.pattern('^[0-9]{5}$')]}),
      check: new FormControl(null, {validators: [Validators.required]}),
    });

    this.orderService.getErrorStatusListener().subscribe(errorData => {
      console.log('error:');
      console.log(errorData.message);
      this.error = true;
      this.errorMessage = errorData.message;
    });
  }

  Order() {
    this.error = false;
    if (this.form.valid) {
      const cart = [] as {productId: string, name: string, size: number, quantity: number}[];
      const productsFromCart = this.cartService.getCartInformation();
      console.log('Products from cart are:');
      console.log(productsFromCart);
      productsFromCart.forEach(element => {
        cart.push({productId: element.id, name: element.name, size: element.size, quantity: element.quantity});
      });
      const order: Order = {
        name: this.form.value.name,
        lastName: this.form.value.lastName,
        address: this.form.value.address,
        phone: this.form.value.phone,
        state: this.form.value.state,
        city: this.form.value.city,
        dateTime: null,
        ordered: false,
        zip: this.form.value.zip,
        cart,
        _id: null
      };
      // pozvati servicse da se prosledi post metodi
      console.log('Information from component ordering-info:');
      console.log(order);
      this.orderService.createOrder(order);
      this.submitted = true;
     // window.location.reload();
      } else {
      console.log('Form for ordering is invalid');
    }
  }

  get getform() {
    return this.form;
  }

  get phone() {
    return this.form.get('phone');
  }

  get zip() {
    return this.form.get('zip');
  }

  get getError() {
    return this.error;
  }

  get getSubmitted() {
    return this.submitted;
  }
}
