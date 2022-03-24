import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerTabEditPageRoutingModule } from './manager-tab-edit-routing.module';

import { ManagerTabEditPage } from './manager-tab-edit.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerTabEditPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [ManagerTabEditPage]
})
export class ManagerTabEditPageModule {}
