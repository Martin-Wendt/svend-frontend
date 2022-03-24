import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerTabPage } from './manager-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerTabPageRoutingModule {}
