import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListItemComponent } from './case-list-item/case-list-item.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CaseLogComponent } from './case-log/case-log.component';
import { CasePickImageComponent } from './case-pick-image/case-pick-image.component';
import { CaseSecureIconComponent } from './case-secure-icon/case-secure-icon.component';
import { CaseFormComponent } from './case-form/case-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseStatusOperationsComponent } from './case-status-operations/case-status-operations.component';

//Component share all other components, to reduce imports in the app 

@NgModule({
  declarations: [
    CaseListItemComponent, 
    CaseDetailsComponent, 
    CaseLogComponent, 
    CasePickImageComponent, 
    CaseSecureIconComponent,
    CaseFormComponent,
    CaseStatusOperationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CaseListItemComponent, 
    CaseDetailsComponent, 
    CaseLogComponent, 
    CasePickImageComponent, 
    CaseSecureIconComponent,
    CaseFormComponent,
    CaseStatusOperationsComponent
  ]
})

export class SharedComponentsModule { }
