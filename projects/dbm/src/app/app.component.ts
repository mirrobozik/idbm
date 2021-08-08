import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Dexie from 'dexie';

@Component({
  selector: 'app-idxdbm',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    Dexie.getDatabaseNames()
    .then(results => {
      this.databases = results;

       const firstDb = new Dexie(this.databases[0]);
       firstDb.open().then(()=>{

        firstDb.tables.forEach(t => {
          console.log(`table ${t.name}`);
        });

       });
    });


    // const db = new Dexie('test'+new Date().getTime());
    // db.version(1).stores({
    //   test: 'id'
    // });
    //db.open();
  }

  title = 'dbm';

  databases: string[] = [];


}
