import { Injectable } from '@angular/core';
import { Order } from '../product-more-info/order.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Injectable({providedIn: 'root'})
export class OrderService {

  constructor(private http: HttpClient, private cartService: CartService) {}

  private ordersUpdated = new Subject<Order[]>();
  private orders: Order[] = [];
  errorStatus = new Subject<{ message: string }>();

  getOrders() {
    const orders = JSON.parse(localStorage.getItem('orders'));
    return orders;
  }

  getOrdersAdmin() {
    this.http.get<{orders: Order[]}>('http://localhost:3000/api/orders').subscribe(responseData => {
      this.orders = responseData.orders;
      this.ordersUpdated.next([...this.orders]);
    });
  }

  getOrderAdmin(id: string) {
    console.log('getProduct =' + id);
    return this.http.get<{  name: string;
      lastName: string, address: string, phone: string, state: string, city: string,
      dateTime: Date, ordered: boolean, zip: string, cart: {productId: string, name: string, size: number, quantity: number}[],
      _id: string }>('http://localhost:3000/api/orders/' + id);
  }

  deleteOrderAdmin(id: string) {
    this.http.delete('http://localhost:3000/api/orders/' + id).subscribe(() => {
      this.orders = this.orders.filter(order => order._id !== id);
      this.ordersUpdated.next([...this.orders]);
    });
  }

  getOrdersListener() {
    return this.ordersUpdated.asObservable();
  }

  getErrorStatusListener() {
    return this.errorStatus.asObservable();
  }

  createOrder( order: Order) {
    console.log('Order is sent to service, post method is being called:');
    console.log(order);
    this.http.post<{message: string, productId: string, productTime: Date}>('http://localhost:3000/api/orders', order)
    .subscribe((responseData) => {
      console.log('ResponseData after post method for order is:');
      console.log(responseData);
      const orderId = responseData.productId;
      order._id = orderId;
      order.dateTime = responseData.productTime;
      console.log('Order which is added:');
      console.log(order);
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      console.log('Array of orders from localStorage is:');
      console.log(orders);
      orders.push({cart: order.cart, address: order.address, city: order.city, state: order.state, zip: order.zip});
      localStorage.setItem('orders', JSON.stringify(orders));
      this.cartService.emptyCart();
      this.ordersUpdated.next([...this.orders]);
    }, error => {
      console.log(error);
      console.log(error.message);
      this.errorStatus.next({
        message: error.error.message
      });
    });
  }

  updateOrder(order: Order, checked: boolean) {
    const updateOrder: Order = {
        name: order.name,
        lastName: order.name,
        address: order.address,
        phone: order.phone,
        state: order.state,
        city: order.state,
        dateTime: order.dateTime,
        ordered: checked,
        zip: order.zip,
        cart: order.cart,
        _id: order._id
      };
    this.http.put<{message: string}>('http://localhost:3000/api/orders/' + order._id, updateOrder).subscribe(response => {
      const updatedOrders = [...this.orders];
      const index = updatedOrders.findIndex(o => o._id === order._id);
      updatedOrders[index] = updateOrder;
      this.orders = updatedOrders;
      this.ordersUpdated.next([...this.orders]);
    });
  }

  emptyOrders() {
    const array = [];
    localStorage.setItem('orders', JSON.stringify(array));
  }

}
