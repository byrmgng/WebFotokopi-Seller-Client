import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"login", component:LoginComponent}
    ]),
    FormsModule,
  ]
})
export class LoginModule { }
