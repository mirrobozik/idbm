import { Component, OnInit } from '@angular/core';
import Dexie from 'dexie';
import { DataEditorDialog } from './data-editor/data-editor.dialog';

@Component({
  selector: 'lib-idbm',
  templateUrl: './idbm.component.html'
})
export class IdbmComponent implements OnInit {

  constructor(private dataEditorDialog: DataEditorDialog) { }

  databaseNames: string[] = [];
  selectedDbName?: string;
  tableNames: string[] = [];
  selectedTableName?: string;
  selectedTablePrimKeyName: string = 'id';
  data: any[] = [];

  ngOnInit(): void {
    Dexie.getDatabaseNames().then(names => {
      this.databaseNames = names;
    });
  }

  private loadTableData(dbName: string, tableName: string) {
    let db = new Dexie(dbName);
    db.open().then(() => {
      this.selectedTablePrimKeyName = db.table(this.selectedTableName!).schema.primKey.name;
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

  onDbNameChange() : void {
    if (this.selectedDbName) {
      this.tableNames = [];
      this.selectedTableName = undefined;

      let db = new Dexie(this.selectedDbName);
      db.open().then(()=>{
        db.tables.forEach(table => {
          console.log(table.name);
          this.tableNames.push(table.name);
        });
        db.close();
      });
    }
  }

  onTableNameChange() : void {
    if (this.selectedDbName && this.selectedTableName) {
      this.data = [];
      this.loadTableData(this.selectedDbName, this.selectedTableName);
    }
  }

  edit(dataRow: any) : void {
    const copy = Object.assign({}, dataRow);
    this.dataEditorDialog
      .open(copy)
      ?.then((data)=> {
        console.log('save', data);
        let db = new Dexie(this.selectedDbName!);
        db.open().then(() => {
          db.table(this.selectedTableName!)
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
