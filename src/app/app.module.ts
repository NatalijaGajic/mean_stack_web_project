import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SideToolbarComponent } from './side-toolbar/side-toolbar.component';
import { SideToolbarBrandsComponent } from './side-toolbar-brands/side-toolbar-brands.component';
import { ItemsDisplayComponent } from './items-display/items-display.component';
import { FooterComponent } from './footer/footer.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProductMoreInfoComponent } from './product-more-info/product-more-info.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterDarkComponent } from './footer-dark/footer-dark.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';
import { RowInCartComponent } from './row-in-cart/row-in-cart.component';
import { OrderingInfoComponent } from './ordering-info/ordering-info.component';
import { BodyProductsComponent } from './body-products/body-products.component';
import { ProductService } from './body-products/product.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserFormSignupComponent } from './user-form/user-form-signup/user-form-signup.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthInterceptor } from './user-form/auth-interceptor';
import { AdminPageComponent } from './admin-pages/admin-page/admin-page.component';
import { AdminPageOrdersComponent } from './admin-page-orders/admin-page-orders.component';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';
import { LoginFormComponent } from './user-form/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideToolbarComponent,
    SideToolbarBrandsComponent,
    ItemsDisplayComponent,
    FooterComponent,
    UserFormComponent,
    ProductMoreInfoComponent,
    ShoppingCartComponent,
    FooterDarkComponent,
    MainPageComponent,
    CartComponent,
    RowInCartComponent,
    OrderingInfoComponent,
    BodyProductsComponent,
    CreateProductComponent,
    JwPaginationComponent,
    UserFormSignupComponent,
    AdminPageComponent,
    AdminPageOrdersComponent,
    AdminPageUsersComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
