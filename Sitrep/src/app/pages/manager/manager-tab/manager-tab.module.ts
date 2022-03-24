import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerTabPageRoutingModule } from './manager-tab-routing.module';

import { ManagerTabPage } from './manager-tab.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerTabPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ManagerTabPage]
})
export class ManagerTabPageModule {}
