import { Component, OnInit } from '@angular/core';
import { ProductService } from '../body-products/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../body-products/product.model';
import { CartService } from './cart.service';
import { OrderService } from '../ordering-info/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  private productid: string;
  public product: Product;
  public total = 0;
  address: string;
city: string;
state: string;
phone: string;
  constructor(public productService: ProductService, public route: ActivatedRoute, private cartService: CartService,
              private orderService: OrderService) { }
  products = [] as { name: string, price: number, quantity: number, size: number, id: string}[];
  orders = [] as {cart: {productId: string, name: string, size: number, quantity: number}[],
  address: string, city: string, state: string, zip: string}[];

  ngOnInit() {
    this.products = this.cartService.getCartInformation();
    this.orders = this.orderService.getOrders();

    this.cartService.getCartListener().subscribe((products: { name: string, price: number,
       quantity: number, size: number, id: string}[]) => {
      this.products = products;
    });

    console.log('In component cart orders are:');
    console.log(this.orders);
    // this.products.push({name: 'NIKE PATIKE 787652-2863 FGRTA-JHFS', price: 23, size: 45, quantity: 4});
    console.log('In component cart products are:');
    console.log(this.products);
    this.products.forEach(element => {
      this.total = this.total + (Number(element.price) * Number(element.quantity));
    });
 }

 onDelete(id: string, size: number) {
  this.products = this.cartService.deleteFromCart(id, size);
  // this.ngOnInit();
 }

}
