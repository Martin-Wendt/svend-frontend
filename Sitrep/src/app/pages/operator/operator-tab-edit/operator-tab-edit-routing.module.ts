import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperatorTabEditPage } from './operator-tab-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OperatorTabEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperatorTabEditPageRoutingModule {}
