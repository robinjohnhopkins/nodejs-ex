import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { EmailBlastComponent } from './email-blast/email-blast.component';
import { UsersComponent } from './users/users.component';
import { AppCustomMaterialModule } from '../AppCustomMaterialModule';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppCustomMaterialModule
  ],
  declarations: [AdminComponent, EmailBlastComponent, UsersComponent]
})
export class AdminModule { }
