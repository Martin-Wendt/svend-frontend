import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatorTabEditPageRoutingModule } from './operator-tab-edit-routing.module';

import { OperatorTabEditPage } from './operator-tab-edit.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatorTabEditPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [OperatorTabEditPage]
})
export class OperatorTabEditPageModule {}
