import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableOverviewExampleComponent } from './table-overview-example/table-overview-example.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerListHttpComponent } from './customer-list-http/customer-list-http.component';
import { TableHttpExampleComponent } from './table-http-example/table-http-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TableOverviewExampleComponent,
    CustomerListComponent,
    CustomerListHttpComponent,
    TableHttpExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
