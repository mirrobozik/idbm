import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IdbmComponent } from './idbm.component';

@NgModule({
  declarations: [
    IdbmComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    IdbmComponent
  ]
})
export class IdbmModule { }
