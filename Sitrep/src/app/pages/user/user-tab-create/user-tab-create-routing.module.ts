import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabCreatePage } from './user-tab-create.page';

const routes: Routes = [
  {
    path: '',
    component: UserTabCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabCreatePageRoutingModule {}
