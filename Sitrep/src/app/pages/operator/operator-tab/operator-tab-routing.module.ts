import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorTabPage } from './operator-tab.page';

const routes: Routes = [
  {
    path: '',
    component: OperatorTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorTabPageRoutingModule {}
