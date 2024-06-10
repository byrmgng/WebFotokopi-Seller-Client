import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"registraiton", component:RegistrationComponent}
    ]),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class RegistrationModule { }
