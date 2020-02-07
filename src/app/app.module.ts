import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [],
  entryComponents:[AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const custom = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-component', custom);
  }

  ngDoBootstrap() {}

}
