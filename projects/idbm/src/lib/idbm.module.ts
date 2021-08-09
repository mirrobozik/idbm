import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OverlayModule } from "@angular/cdk/overlay";
import { IdbmComponent } from './idbm.component';
import { DataEditorComponent } from './data-editor/data-editor.component';
import { DatabaseExplorerComponent } from './database-explorer/database-explorer.component';

@NgModule({
  declarations: [
    IdbmComponent,
    DataEditorComponent,
    DatabaseExplorerComponent
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
