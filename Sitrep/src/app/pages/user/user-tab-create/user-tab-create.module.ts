import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabCreatePageRoutingModule } from './user-tab-create-routing.module';

import { UserTabCreatePage } from './user-tab-create.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabCreatePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ],
  declarations: [UserTabCreatePage]
})
export class UserTabCreatePageModule {}
