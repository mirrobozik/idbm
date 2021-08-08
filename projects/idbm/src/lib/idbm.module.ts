import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { IdbmComponent } from './idbm.component';
import { DataEditorComponent } from './data-editor/data-editor.component';

@NgModule({
  declarations: [
    IdbmComponent,
    DataEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule
  ],
  exports: [
    IdbmComponent
  ]
})
export class IdbmModule { }
