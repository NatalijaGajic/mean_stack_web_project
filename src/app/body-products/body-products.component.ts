import { Component, OnInit, OnDestroy } from '@angular/core';
import {Product} from './product.model';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-body-products',
  templateUrl: './body-products.component.html',
  styleUrls: ['./body-products.component.css']
})
export class BodyProductsComponent implements OnInit, OnDestroy {
products: Product[] = [];
private productSubscription: Subscription;
private querySubscription: Subscription;
private filterCathegory = '';
private filterBrands = '';
public itemsPerPage = 2;
branding = ['Nike', 'Adidas', 'Reebok' ];
  form: FormGroup;
  selectedBrands = [];
  selectedCathegory = '';
  selectedBrandsArrayValues = '';


constructor( public productService: ProductService,
             public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {}

ngOnInit() {

  this.form = this.formBuilder.group({
    men: [],
    women: [],
    kids: [],
    brands: this.addBrandControl()
  });
  const array = [];
  array.push({criterium: '', value: ''});
  array.push({criterium: '', value: ''});
  this.productService.getProducts(array);
  // zbog main page-a, sada vise ne treba brendovi, moze da se doda, treba da se izvrsi samo kad se ide sa main page-a
  // jer onda reload ne radi kako treba
  this.productSubscription = this.productService.getProductsListener().subscribe((products: Product[]) => {
    this.products = products;
  });
}

ngOnDestroy() {
  this.productSubscription.unsubscribe();
}

  addBrandControl() {
    const array = this.branding.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(array);
  }

  get BrandControlArray() {
    return this.form.get('brands') as FormArray;
  }

  public  getSelectedBrands() {
    console.log('getSelectedBrands is executing');
    this.selectedBrands = [];
    this.BrandControlArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedBrands.push(this.branding[i]);
      }
    });
    this.selectedBrandsArrayValues = '';
    this.selectedBrands.forEach((brand, i) => {
      this.selectedBrandsArrayValues += '/' + brand;
    });
    console.log('selectedBrandsArrayValues are: ' + this.selectedBrandsArrayValues);
  }

  public changeSelectedCathegory(cathegory: string) {
    this.selectedCathegory = cathegory;
    console.log(this.selectedCathegory);
  }

  getSelectedCathegory() {
      return this.selectedCathegory;
  }

  onSearch() {
    this.getSelectedBrands();
    console.log(this.selectedBrands);
    const cathegory = this.getSelectedCathegory();
    console.log(cathegory);
    const array = [];
    if (cathegory) {
      array.push({criterium: 'Cathegory', value: cathegory});
      if (this.selectedBrands.length > 0) {
        array.push({criterium: 'Brand', value: this.selectedBrandsArrayValues});
        this.productService.getProducts(array);
      } else {
        array.push({criterium: '', value: ''});
        this.productService.getProducts(array);
      }
    } else if (this.selectedBrands.length > 0) {
      array.push({criterium: '', value: ''});
      array.push({criterium: 'Brand', value: this.selectedBrandsArrayValues});
      this.productService.getProducts(array);
    } else {
      array.push({criterium: '', value: ''});
      array.push({criterium: '', value: ''});
      this.productService.getProducts(array);
    }
  }

}

