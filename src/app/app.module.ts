import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminModule } from './admin/admin.module';
import { AppCustomMaterialModule } from './AppCustomMaterialModule';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    AppCustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
