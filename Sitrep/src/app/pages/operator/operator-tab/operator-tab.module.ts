import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperatorTabPageRoutingModule } from './operator-tab-routing.module';

import { OperatorTabPage } from './operator-tab.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OperatorTabPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [OperatorTabPage]
})
export class OperatorTabPageModule {}
