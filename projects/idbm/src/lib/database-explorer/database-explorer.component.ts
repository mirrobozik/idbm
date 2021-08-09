import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Dexie from 'dexie';
import { TableInfo } from './table-info.model';

@Component({
  selector: 'lib-database-explorer',
  templateUrl: './database-explorer.component.html',
  styleUrls: ['./database-explorer.component.scss']
})
export class DatabaseExplorerComponent implements OnInit {

  databaseNames: string[] = [];
  selectedDbName?: string;
  tableNames: string[] = [];
  selectedTableName?: string;

  constructor() { }

  @Output()
  tableSelected: EventEmitter<TableInfo> = new EventEmitter<TableInfo>();

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
    this.tableSelected.emit(<TableInfo>{
      databaseName: this.selectedDbName,
      tableName: this.selectedTableName
    });
  }

}
