import { Component } from '@angular/core';
import Dexie from 'dexie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-app';

  createTestDb() : void {
    const now = new Date();
    const d = new Dexie(`testdb_${now.getTime()}`);
    d.version(1).stores({
      person: 'id, name',
      orders: 'id'
    });

    d.open().then(() => {
      for (let index = 1; index < 100; index++) {
        d.table('person').add({
          id: index,
          name: 'MiroB '+ index
        }, index);
      }

    });
  }
}
