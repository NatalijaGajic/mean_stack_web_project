import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../body-products/product.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../body-products/product.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user-form/user.service';
import { Subscription } from 'rxjs';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  constructor(public productService: ProductService, public route: ActivatedRoute,
              private userService: UserService, private router: Router) { }

  fromInvalid = false;
  enteredName = '';
  enteredAbout = '';
  enteredPrice = '';
  public sizes = [] as {size: number, count: number}[];
  public mode = true;
  product: Product;
  productid;
  brands = [];
  chategories = [];
  form: FormGroup;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  imagePreview: string;
  imagePath: string;

  ngOnInit() {
    this.form = new FormGroup({
    name: new FormControl(null, {validators: [Validators.required]}),
    about: new FormControl (null, {validators: [Validators.required]}),
    price: new FormControl (null, {validators: [Validators.required]}),
    cathegory: new FormControl (null, {validators: [Validators.required]}),
    brand: new FormControl (null, {validators: [Validators.required]}),
    size: new FormControl (null),
    count: new FormControl (null),
    image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.brands.push('Nike');
    this.brands.push('Adidas');
    this.brands.push('Reebok');
    this.chategories.push('Men');
    this.chategories.push('Women');
    this.chategories.push('Kids');

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
          this.mode = true;
          console.log('mode je edit');
          this.productid = paramMap.get('_id');
          console.log(this.productid);

          // *************imagePath null

          this.productService.getProduct(this.productid).subscribe(productData => {
              this.product = {_id: productData._id, name: productData.name,
              about: productData.about, brand: productData.brand, sizes: productData.sizes, price: productData.price,
              cathegory: productData.cathegory, imagePath: productData.imagePath};
              console.log('Vrednost putanje:');
              console.log(productData.imagePath);
              this.sizes = productData.sizes;
              // console.log('proizvod: ' + JSON.stringify(this.product));
              this.form.setValue({name: this.product.name, about: this.product.about, price: this.product.price,
                cathegory: this.product.cathegory, brand: this.product.brand, size: '', count: '', image: productData.imagePath} );
              this.imagePath = productData.imagePath;
            });

          } else {
            console.log('mode je create');
            this.form.reset();
            this.mode = false;
          }
      });
    this.authStatusSub = this.userService.getAuthStatusListener()
        .subscribe(isAuhtenticated => {
        this.userIsAuthenticated = isAuhtenticated;
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    // reader.readAsDataURL trigeruje onload koja je asinhrona
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  get about() {
    return this.form.get('about');
  }


      onAddProduct() {
          console.log('onAddProduct is about to be executed');
          if (this.form.invalid) {
          this.fromInvalid = true;
          console.log('form is invalid');
          return;
        } else if (this.form.valid && this.sizes.length > 0) {
          this.fromInvalid = false;
          if (this.form.value.price > 0) {
            console.log('Product is being onAddProduct made');
            const product: Product = {_id: null,
          name: this.form.value.name,
          about: this.form.value.about,
          price: this.form.value.price,
          cathegory: this.form.value.cathegory,
          sizes: this.sizes,
          brand: this.form.value.brand,
          imagePath: null
         };

            console.log('product is made: ' + product.about + product.about + product.price + product.cathegory +
          product.sizes + product.brand );
            this.productService.addProduct(product.name, product.about, product.price, product.cathegory,
            product.sizes, product.brand, this.form.value.image);
            this.form.reset();
            this.sizes = [];
          } else {
            this.fromInvalid = true;
          }
      }
    }


editProduct() {
    if (this.form.valid && this.sizes.length > 0 && this.form.value.price > 0) {
      console.log('Product which should be updated: ' + this.productid + this.form.value.name + this.form.value.about +
      this.form.value.price + this.form.value.cathegory + this.sizes + this.form.value.brand);
      this.productService.updateProduct(this.productid, this.form.value.name, this.form.value.about, this.form.value.price,
      this.form.value.cathegory, this.sizes, this.form.value.brand, this.form.value.image);
      this.form.reset();
      this.sizes = [];
      this.router.navigate(['/admin']);
    } else {
      this.fromInvalid = true;
      console.log('Form is invalid');
    }
  }

onAddSizes() {
    console.log('this.sizes: ', this.sizes);
    const sizeFromInput = this.form.value.size;
    const countFromInput = this.form.value.count;

    console.log('sizeFromInput: ', sizeFromInput);
    console.log('countFromInput: ', countFromInput);

    if (sizeFromInput === null || countFromInput === null) {
      console.log('ne moze da se unese prazna vrednost');
      return;
    }
    if ( Number(sizeFromInput) > 0 && Number(sizeFromInput) < 50 && Number(countFromInput) > 0) {
      const index = this.sizes.findIndex(s => s.size === Number(sizeFromInput));
      if (index === -1) {
        console.log('element nije u nizu, znaci da se dodaje');
        this.sizes.push({size: Number(sizeFromInput), count: Number(countFromInput)});
      } else {
        console.log('element je vec u nizu, samo ga treba azurirati');
        this.sizes[index] = {size: Number(sizeFromInput), count: Number(countFromInput)};
      }
    }
  }

onDelete(sizeGet: number) {
      console.log(sizeGet);
      const count = 2;

      // const count = form.value.countOfsizes;
      // const size = form.value.sizeOfsizes;
      console.log(sizeGet.toString());
      console.log('evo sta je povukao' + sizeGet);
      this.sizes = this.sizes.filter(notSizeget);

      function notSizeget(element, index, array) {
        return (element.size !== sizeGet);
      }
  }

  get getForm() {
    return this.form;
  }

  get getValidity() {
    return this.fromInvalid;
  }

  get getPrice() {
    return this.form.value.price;
  }
}
