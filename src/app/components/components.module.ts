import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { SellerInfoModule } from './seller-info/seller-info.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeModule,
    LoginModule,
    RegistrationModule,
    OrdersModule,
    FilesModule,
    SellerInfoModule
  ]
})
export class ComponentsModule { }
