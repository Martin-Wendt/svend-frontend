import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabPageRoutingModule } from './user-tab-routing.module';

import { UserTabPage } from './user-tab.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [UserTabPage]
})
export class UserTabPageModule {}