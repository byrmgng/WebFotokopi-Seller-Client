import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { OrdersComponent } from './components/orders/orders.component';
import { authGuard } from './guards/auth.guard';
import { PackagesComponent } from './components/packages/packages.component';
import { logoutauthGuard } from './guards/logoutauth.guard';
import { FilesComponent } from './components/files/files.component';
import { SellerInfoComponent } from './components/seller-info/seller-info.component';

const routes: Routes = [
  {path:"",component:HomeComponent,loadChildren:() => import("./components/home/home.module").then(module=>module.HomeModule)},
  {path:"login",component:LoginComponent,loadChildren:() => import("./components/login/login.module").then(module=>module.LoginModule),canActivate:[logoutauthGuard]},
  {path:"registration",component:RegistrationComponent,loadChildren:() => import("./components/registration/registration.module").then(module=>module.RegistrationModule),canActivate:[logoutauthGuard]},
  {path:"orders",component:OrdersComponent,loadChildren:() => import("./components/orders/orders.module").then(module=>module.OrdersModule),canActivate:[authGuard]},
  {path:"packages",component:PackagesComponent,loadChildren:() => import("./components/packages/packages.module").then(module=>module.PackagesModule),canActivate:[authGuard]},
  {path:"sellerInfo",component:SellerInfoComponent,loadChildren:() => import("./components/seller-info/seller-info.module").then(module=>module.SellerInfoModule),canActivate:[authGuard]},
  {path:"files",component:FilesComponent,loadChildren:() => import("./components/files/files.module").then(module=>module.FilesModule),canActivate:[authGuard]},
  { path: "**", redirectTo: "" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
