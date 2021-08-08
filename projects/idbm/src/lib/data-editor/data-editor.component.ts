import { Component, OnInit } from '@angular/core';
import { DataEditorResult } from './data-editor-result';

@Component({
  selector: 'lib-data-editor',
  templateUrl: './data-editor.component.html',
  styleUrls: ['./data-editor.component.scss']
})
export class DataEditorComponent implements OnInit {

  strData: string = '';

  constructor(
    public result: DataEditorResult
  ) {
    this.strData = JSON.stringify(result.data);
  }

  ngOnInit(): void {
  }

  save() {
    this.result.save(JSON.parse(this.strData));
  }
}
