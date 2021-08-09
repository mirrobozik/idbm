import { Component, OnInit } from '@angular/core';
import Dexie from 'dexie';
import { DataEditorDialog } from './data-editor/data-editor.dialog';
import { TableInfo } from './database-explorer/table-info.model';

@Component({
  selector: 'lib-idbm',
  templateUrl: './idbm.component.html'
})
export class IdbmComponent implements OnInit {

  constructor(private dataEditorDialog: DataEditorDialog) { }

  selectedTablePrimKeyName: string = 'id';
  tableInfo?: TableInfo;
  data: any[] = [];

  ngOnInit(): void {
  }

  onTableSelected(evt: TableInfo): void {
    this.tableInfo = evt;
    if (evt) {
      this.loadTableData(evt.databaseName, evt.tableName);
    }
  }

  private loadTableData(dbName: string, tableName: string) {
    let db = new Dexie(dbName);
    db.open().then(() => {
      this.selectedTablePrimKeyName = db.table(tableName).schema.primKey.name;
      db.table(tableName)
        .toArray()
        .then(data => {
          this.data = data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          db.close();
        })
        ;
    });
  }

  edit(dataRow: any) : void {
    if (!this.tableInfo) {
      return;
    }
    const copy = Object.assign({}, dataRow);
    this.dataEditorDialog
      .open(copy)
      ?.then((data)=> {
        console.log('save', data);
        let db = new Dexie(this.tableInfo?.databaseName!);
        db.open().then(() => {
          db.table(this.tableInfo?.tableName!)
            .put(data, dataRow[this.selectedTablePrimKeyName])
            .then(() => {
              db.close();
            })
            .catch((e)=> {
              console.log(e);
            })
            .finally(() => {
              db.close();
            })
            ;
        });
      })
      .catch(()=>{
        console.log('rejected/closed');
      })
      ;
  }

}
