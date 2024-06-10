import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerInfoComponent } from './seller-info.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SellerInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"sellerInfo", component:SellerInfoComponent}
    ]),
    FormsModule,
  ]
})
export class SellerInfoModule { }
