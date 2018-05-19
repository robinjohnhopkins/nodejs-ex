import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminModule } from './admin/admin.module';
import { AppCustomMaterialModule } from './AppCustomMaterialModule';
import { DataService } from './services/data.service';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

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
    AppCustomMaterialModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
