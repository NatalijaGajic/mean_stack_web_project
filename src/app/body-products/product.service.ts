import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable ({providedIn: 'root'})
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();


  constructor(private http: HttpClient) {}

  getProducts(array: {value: string, criterium: string }[]) {
    const queryParams =
    `?criterium0=${array[0].criterium}&value0=${array[0].value}&criterium1=${array[1].criterium}&value1=${array[1].value}`;
    console.log(array[0].criterium + ' value: ' + array[0].value);
    console.log(array[1].criterium + ' value: ' + array[1].value);
    this.http.get<{message: string, products: Product[]}>('http://localhost:3000/api/products' + queryParams )
    .subscribe((productData) => {
    this.products = productData.products;
    this.productsUpdated.next([...this.products]);
    });
    // fali za this.productsUpdated
  }


  getProductsListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct( id: string) {
    console.log('getProduct =' + id);
    return this.http.get<{_id: string, name: string,
    about: string, brand: string, sizes: {size: number, count: number}[], price: number,
    cathegory: string, imagePath: string}>('http://localhost:3000/api/products/' + id);
  }


  // dodat image kao parametar
  addProduct(title: string, info: string, value: number, cat: string, size: {size: number, count: number}[],
             branding: string, image: File) {
    console.log('product iz being added');
   // const product: Product = {_id: null, name: title, about: info, price: value, cathegory: cat, brand: branding, sizes: size};

    const productData = new FormData();
    productData.append('name', title);
    productData.append('about', info);
    productData.append( 'price', value.toString());
    productData.append('cathegory', cat);
    productData.append('brand', branding);
    productData.append('sizes', JSON.stringify(size));
    productData.append('image', image, title);
    this.http.post<{message: string, productCreated: Product}>('http://localhost:3000/api/products', productData)
    .subscribe((responseData) => {
      console.log( responseData.productCreated.imagePath);
      const product: Product = {
        _id: responseData.productCreated._id,
        name: title, about: info, price: value, cathegory: cat, brand: branding, sizes: size,
        imagePath: responseData.productCreated.imagePath
        // fali image
      };
      console.log(responseData.message);
     // const id = responseData.productId;
      // product._id = id;
      this.products.push(product);
      this.productsUpdated.next([...this.products]);
    });
  }

  deleteProduct(productID: string) {
    this.http.delete('http://localhost:3000/api/products/' + productID).subscribe(() => {
      console.log('Produst is deleted');
      const updatedProductsDelete = this.products.filter(post => post._id !== productID);
      this.products = updatedProductsDelete;
      this.productsUpdated.next([...this.products]);
    });
  }

  // imagePath null
  updateProduct(productID: string, title: string, info: string, value: number, cat: string,
                size: {size: number, count: number}[], branding: string, image: File | string) {
    let product: FormData | Product;
    if (typeof(image) === 'object') {
      product = new FormData();
      product.append('_id', productID);
      product.append('name', title);
      product.append('about', info);
      product.append('price', value.toString());
      product.append('cathegory', cat);
      product.append('brand', branding);
      product.append('sizes', JSON.stringify(size));
      product.append('image', image, title);
    } else {
      product = { _id: productID, name: title, about: info, price: value, cathegory: cat,
        brand: branding, sizes: size, imagePath: image};
    }
    console.log(product);
    this.http.put<{message: string, result: Product}>('http://localhost:3000/api/products/' + productID, product).subscribe(response => {
        console.log(response);
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(p => p._id === productID);
        const updatedProduct: Product = {
          _id: productID, name: title, about: info, price: value, cathegory: cat,
          brand: branding, sizes: size, imagePath: response.result.imagePath
        };
        updatedProducts[oldProductIndex] = updatedProduct;
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
    });

    }


}
