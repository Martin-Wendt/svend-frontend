import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerTabEditPage } from './manager-tab-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerTabEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerTabEditPageRoutingModule {}
