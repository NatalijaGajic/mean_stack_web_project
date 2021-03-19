import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CartService {

  private name: string;
  private price: number;
  private size: number;
  private quantity: number;
  private productAlreadyinCart;
  private cartUpdated = new Subject<{ name: string, price: number, size: number, quantity: number, id: string }[]>();
  product = [] as { name: string, price: number, size: number, quantity: number, id: string }[];

  getCartListener() {
    return this.cartUpdated.asObservable();
  }

  setCartInformation(name: string, price: number, size: number, quantity: number, id: string) {
   /*this.product.push( {name, price, size, quantity, id});
   console.log('array of products is being set to:');
   console.log(this.product);*/
   const products = JSON.parse(localStorage.getItem('products') || '[]');
   console.log('Array of products from localStorage is:');
   console.log(products);
   this.productAlreadyinCart = false;
   if (products.length > 0) {
    products.forEach( element => {
      console.log('Checking cart for element');
      console.log('element');
      if (element.id === id) {
        console.log('Found a product with the same id');
        if (Number(element.size) === Number(size)) {
          console.log('Found elements with same id and size');
          this.productAlreadyinCart = true;
          element.quantity = quantity;
        }
      }
    });
   }
   if (!this.productAlreadyinCart) {
    products.push({name, price, size, quantity, id});
   }
   localStorage.setItem('products', JSON.stringify(products));
   this.cartUpdated.next([...products]);
  }

  getCartInformation() {
    console.log('Array of products from local storage is being returned:');
    const products = JSON.parse(localStorage.getItem('products'));
    console.log(products);
    return products;
  }

  emptyCart() {
    const array = [];
    localStorage.setItem('products', JSON.stringify(array));
    this.cartUpdated.next([...array]);
  }

  deleteFromCart(id: string, size: number) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    console.log('Array of products from localStorage is:');
    console.log(products);
    const newArrayofProducts = [] as { name: string, price: number, size: number, quantity: number, id: string }[];
    if (products.length > 0) {
      products.forEach( element => {
        console.log('Checking cart for element');
        console.log(element);
        if (element.id === id) {
          console.log('Found a product with same id');
          if (Number(element.size) !== Number(size)) {
            console.log('Found elements with same id and different size');
            newArrayofProducts.push(element);
          }
        } else {
          newArrayofProducts.push(element);
        }
      });
     }
    localStorage.setItem('products', JSON.stringify(newArrayofProducts));
    this.cartUpdated.next([...newArrayofProducts]);
    return newArrayofProducts;
  }

}
