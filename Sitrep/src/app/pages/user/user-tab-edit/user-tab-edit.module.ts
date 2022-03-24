import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabEditPageRoutingModule } from './user-tab-edit-routing.module';

import { UserTabEditPage } from './user-tab-edit.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabEditPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [UserTabEditPage]
})
export class UserTabEditPageModule {}
