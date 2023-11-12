import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {isAuthentificationGuard} from "./guards/authentification.guard";
import {isAuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";


const routes: Routes = [
  {path : "login", component: LoginComponent},
  {path : "admin", component : AdminTemplateComponent ,canActivate : [isAuthentificationGuard], children : [
      {path : "home", component: HomeComponent},
      {path : "products", component: ProductsComponent},
      {path : "newProduct", component: NewProductComponent, canActivate :[isAuthorizationGuard],
      data : {requiredRoles :  "ADMIN"}},
      {path : "editProduct/:id", component: EditProductComponent},
      {path : "notauthorized", component: NotAuthorizedComponent}
    ]},


  {path : "", redirectTo :"login", pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
