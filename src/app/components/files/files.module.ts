import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"files", component:FilesComponent}
    ]),
    FormsModule,
  ]
})
export class FilesModule { }
