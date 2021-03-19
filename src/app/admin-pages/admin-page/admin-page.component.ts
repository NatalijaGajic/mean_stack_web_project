import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../body-products/product.service';
import { Product } from '../../body-products/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Order } from '../../product-more-info/order.model';
import { UserService } from '../../user-form/user.service';
import { OrderService } from '../../ordering-info/order.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

private productSubscription: Subscription;
private filterCathegory = '';
private filterBrands = '';
public itemsPerPage = 2;
public searchText = '';
p = 1;


constructor( public productService: ProductService, public activatedRoute: ActivatedRoute,
             private orderService: OrderService, private router: Router) {}


  chategories = ['Men', 'Women', 'Kids' ];
  brands = ['Nike', 'Reebok', 'Adidas' ];
  products: Product[] = [];
  orders: Order[] = [];
  public productsSelected = false;
  public usersSelected = false;
  public ordersSelected = false;
  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup ({
      cathegory: new FormControl(),
      brand: new FormControl(),
      all: new FormControl()
    });
    this.productSubscription = this.productService.getProductsListener().subscribe((products: Product[]) => {
      this.products = products;
    });
    this.onAll();
  }

  onDelete(id: string) {
    console.log('Calling onDelete for:' + id);
    this.productService.deleteProduct(id);
  }

  onApply() {
    console.log(this.form.value.cathegory);
    console.log(this.form.value.brand);
    const array = [];
    if (this.form.value.cathegory) {
      array.push({criterium: 'Cathegory', value: this.form.value.cathegory});
      if (this.form.value.brand) {
        array.push({criterium: 'Brand', value: this.form.value.brand});
        this.productService.getProducts(array);
      } else {
        array.push({criterium: '', value: ''});
        this.productService.getProducts(array);
      }
    } else if (this.form.value.brand) {
      array.push({criterium: '', value: ''});
      array.push({criterium: 'Brand', value: this.form.value.brand});
      this.productService.getProducts(array);
    } else {
      array.push({criterium: '', value: ''});
      array.push({criterium: '', value: ''});
      this.productService.getProducts(array);
    }
  }

  onAll() {
    this.productsSelected = true;
    this.usersSelected = false;
    this.ordersSelected = false;
    const array = [];
    array.push({criterium: '', brand: ''});
    array.push({criterium: '', brand: ''});
    this.productService.getProducts(array);
  }

  onOrders() {
    this.router.navigate(['/admin/orders']);
  }

  onUsers() {
    this.router.navigate(['/admin/users']);
  }

  onAddClick() {
    this.router.navigate(['/admin']);
  }
}
