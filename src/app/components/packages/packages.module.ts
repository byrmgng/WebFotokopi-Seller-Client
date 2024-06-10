import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"packages", component:PackagesComponent}
    ]),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PackagesModule { }
