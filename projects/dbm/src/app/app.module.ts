import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from "@angular/elements";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: []
})
export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() : void {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-idxdbm', el);
  }
}
