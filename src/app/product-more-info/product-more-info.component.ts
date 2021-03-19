import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../body-products/product.service';
import { ActionSequence } from 'protractor';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../body-products/product.model';
import { UserService } from '../user-form/user.service';
import { Subject, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-more-info',
  templateUrl: './product-more-info.component.html',
  styleUrls: ['./product-more-info.component.css']
})
export class ProductMoreInfoComponent implements OnInit, OnDestroy {

  private productid: string;
  public product: Product;
  private authStatusSub: Subscription;
  public userIsAuthenticated = false;
  public adminIsLogedIn = false;
  form: FormGroup;
  private size = 0;
  private sizeAndQuantity = false;
  public productID;
  constructor(public productService: ProductService, public route: ActivatedRoute, private userService: UserService,
              private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      quantity: new FormControl(1)
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
          this.productid = paramMap.get('_id');
          console.log(this.productid);
          this.productService.getProduct(this.productid).subscribe(productData => {
            this.product = {_id: productData._id, name: productData.name,
            about: productData.about, brand: productData.brand, sizes: productData.sizes, price: productData.price,
            cathegory: productData.cathegory, imagePath: productData.imagePath};
            this.productID = this.product._id;
          });
          console.log('proizvod: ' + JSON.stringify(this.product));
      }
    });
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.adminIsLogedIn = this.userService.getAutor();
    this.userService.getAutorStatusListener().subscribe(isAutorizedAsAdmin => {
      this.adminIsLogedIn = isAutorizedAsAdmin;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  onAddToCart() {
    if (this.size !== 0 && this.form.value.quantity > 0) {
      console.log('price:' + this.product.price);
      console.log('name:' + this.product.name);
      console.log('size:' + this.size);
      console.log('quantity:' + this.form.value.quantity);
      console.log('id:' + this.product._id);
      this.cartService.setCartInformation(this.product.name, this.product.price, this.size, this.form.value.quantity, this.product._id);
      this.router.navigate(['/cart']);
    } else {
      this.sizeAndQuantity = true;
      console.log('Size is not picked');
    }

  }

  get getSizeQuantity() {
    return this.sizeAndQuantity;
  }

  getQuantity(size: number) {
    console.log('On click quantity: ' + size);
    this.size = size;
  }
}
