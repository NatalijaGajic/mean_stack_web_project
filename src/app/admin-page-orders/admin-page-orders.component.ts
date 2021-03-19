import { Component, OnInit } from '@angular/core';
import { Order } from '../product-more-info/order.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../ordering-info/order.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-page-orders',
  templateUrl: './admin-page-orders.component.html',
  styleUrls: ['./admin-page-orders.component.css']
})
export class AdminPageOrdersComponent implements OnInit {

  chategories = ['Men', 'Women', 'Kids' ];
  brands = ['Nike', 'Reebok', 'Adidas' ];
  public searchText;
  orders: Order[] = [];
  public productsSelected = false;
  public usersSelected = false;
  public ordersSelected = false;
  form: FormGroup;
  public mode = false;
  order: Order;
  private orderID;
  public items = [] as {productId: string, name: string, size: number, quantity: number}[];
  private orderSubscription: Subscription;
  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      lastName: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      address: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      phone: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      state: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      city: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      zip: new FormControl({value: '', disabled: true}, {validators: [Validators.required]}),
      check: new FormControl({value: false}),
    });
    this.orderSubscription = this.orderService.getOrdersListener().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
    this.orderService.getOrdersAdmin();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = true;
        console.log('mode je edit');
        this.orderID = paramMap.get('_id');
        console.log(this.orderID);
        this.orderService.getOrderAdmin(this.orderID).subscribe(orderData => {
            this.order = {name: orderData.name,
              lastName: orderData.lastName, address: orderData.address, phone: orderData.phone, state: orderData.state,
              city: orderData.city, dateTime: orderData.dateTime, ordered: orderData.ordered, zip: orderData.zip, cart: orderData.cart,
              _id: orderData._id};
            console.log('Order:');
            console.log(this.order);
            this.form.setValue({name: this.order.name, lastName: this.order.lastName, address: this.order.address,
              phone:  this.order.phone, state: this.order.state, city: this.order.city, zip: this.order.zip, check: false} );
            this.items = this.order.cart;
          });

        } else {
          console.log('mode je create');
          this.mode = false;
        }
    });
    // fali autentifikacija
  }

  onDelete(id: string) {
    console.log('Calling onDelete order for:');
    console.log(id);
    this.orderService.deleteOrderAdmin(id);
  }

  onChange(order: Order) {
    console.log(order._id);
    console.log(this.form.value.check);
    if (this.form.value.check) {
      if (this.order.ordered) {
        this.orderService.updateOrder(order, false);
      } else {
        this.orderService.updateOrder(order, true);
      }

    }
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
