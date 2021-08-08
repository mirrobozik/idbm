import { Component, OnInit } from '@angular/core';
import Dexie from 'dexie';

@Component({
  selector: 'lib-idbm',
  templateUrl: './idbm.component.html',
  styles: [
  ]
})
export class IdbmComponent implements OnInit {

  constructor() { }

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
      let db = new Dexie(this.selectedDbName);
      db.open().then(() => {
        console.log(db.table(this.selectedTableName!).schema);
        this.selectedTablePrimKeyName = db.table(this.selectedTableName!).schema.primKey.name;
        db.table(this.selectedTableName!)
          .toArray()
          .then(data => {
            this.data = data;
            console.log(data);
            db.close();
          });
      });
    }
  }

}
