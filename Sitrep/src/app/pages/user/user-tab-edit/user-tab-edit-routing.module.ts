import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabEditPage } from './user-tab-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UserTabEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabEditPageRoutingModule {}
