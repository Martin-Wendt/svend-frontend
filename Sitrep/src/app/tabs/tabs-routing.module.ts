import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    //Register all routes that should be available in the tabs router
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'user-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/user/user-tab/user-tab.module').then( m => m.UserTabPageModule),
          },
          {
            path: 'create',
            loadChildren: () => import('../pages/user/user-tab-create/user-tab-create.module').then( m => m.UserTabCreatePageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../pages/user/user-tab-edit/user-tab-edit.module').then( m => m.UserTabEditPageModule)
          }
        ]
      },
      {
        path: 'manager-tab',
        canActivate: [RoleGuard],
        data: {
          role: 'Manager'
        },
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/manager/manager-tab/manager-tab.module').then( m => m.ManagerTabPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../pages/manager/manager-tab-edit/manager-tab-edit.module').then( m => m.ManagerTabEditPageModule)
          }
        ]
      },
      {
        path: 'operator-tab',
        canActivate: [RoleGuard],
        data: {
          role: 'Operator'
        },
        children: [
          {
            path: '',
            loadChildren:  () => import('../pages/operator/operator-tab/operator-tab.module').then( m => m.OperatorTabPageModule),
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../pages/operator/operator-tab-edit/operator-tab-edit.module').then( m => m.OperatorTabEditPageModule),
          }
        ]
      },
      {
        path: 'my-profile',
        loadChildren: () => import('../pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/user-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
