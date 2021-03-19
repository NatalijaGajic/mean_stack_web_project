import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyProductsComponent } from './body-products/body-products.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartComponent } from './cart/cart.component';
import { ProductMoreInfoComponent } from './product-more-info/product-more-info.component';
import { UserFormSignupComponent } from './user-form/user-form-signup/user-form-signup.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { AdminPageComponent } from './admin-pages/admin-page/admin-page.component';
import { AdminPageOrdersComponent } from './admin-page-orders/admin-page-orders.component';
import { AdminPageUsersComponent } from './admin-page-users/admin-page-users.component';
import { AuthGuard } from './user-form/auth.guard';
import { LoginFormComponent } from './user-form/login-form/login-form.component';
import { AutorGuard } from './user-form/autor.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'products', component: BodyProductsComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'more/:_id', component: ProductMoreInfoComponent },
  {path: 'cart/:_id', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: UserFormSignupComponent},
  {path: 'edit/:_id', component: CreateProductComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'admin/orders', component: AdminPageOrdersComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'admin/orders/:_id', component: AdminPageOrdersComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'admin/users', component: AdminPageUsersComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'admin/:_id', component: AdminPageComponent, canActivate: [AuthGuard, AutorGuard]},
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AutorGuard]
})

export class AppRoutingModule {}
