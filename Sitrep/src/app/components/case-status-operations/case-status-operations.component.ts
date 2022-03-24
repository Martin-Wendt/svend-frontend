import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AlertController } from '@ionic/angular';
import { map, takeWhile, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { CaseLink } from 'src/models/CaseLink';
import { Case } from 'src/models/sitrepCase';

@Component({
  selector: 'app-case-status-operations',
  templateUrl: './case-status-operations.component.html',
  styleUrls: ['./case-status-operations.component.scss'],
})
export class CaseStatusOperationsComponent {
  
  @Input()case: Case;
  @Input()tabType: string;
  roles: string[];
  userid;

  constructor(private apiService: ApiService,
    private alertController: AlertController,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService) {
    
    this.authService.user$.pipe(
      takeWhile((user) => user !== null),
      tap((user) => {
        const roles = user['https://sitrep.dk//roles'];
        this.roles = roles
        this.userid = user.sub
      })).subscribe()
  }

  //Handling for user clicked on the approve button
  async approveCase(){
    const alert = await this.alertController.create({
      header: 'Godkend sag',
      message: 'Tilføj kommentar og prioritet og tryk godkend',
      inputs: [
        { name: 'msg', placeholder: 'Kommentar', type: 'text' },
        { name: 'priorityId', type: 'number', value: 2, min: 2, max: 4 }
      ],
      buttons: [
        { text: 'Annuller', role: 'cancel' },
        { text: 'Godkend',
          handler: (data) => {
            let patch = [
              { op:"replace", path:"/statusId", value: 2 },
              { op:"replace", path:"/priorityId", value: data.priorityId }
            ]
            let link: CaseLink = this.case.links.find(link => link.rel == "patch_case");
            this.apiService.patchRequest(link.href, patch).subscribe(async (response) => {

              this.apiService.postLogMessage(this.case.CaseId, 'Godkender sagen med kommentar (' + data.msg + ')').subscribe();
              await this.toastService.presentPositiveMessage("Sag godkendt"); 
              this.router.navigateByUrl('/app/tabs/manager-tab', { replaceUrl: true });

            }, async (error) => {
              await this.toastService.presentNegativeMessage("fejl, kunne ikke godkende sag");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  
  //Handling for user clicked on the decline button
  async declineCase(){
    const alert = await this.alertController.create({
      header: 'Afvises',
      message: 'Tilføj kommentar',
      inputs: [
        { name: 'msg', placeholder: 'Kommentar', type: 'text' }
      ],
      buttons: [
        { text: 'Annuller', role: 'cancel' },
        { text: 'Afvis',
          handler: (data) => {
            let patch = [
              { op:"replace", path:"/statusId", value: 5 }
            ]
            let link: CaseLink = this.case.links.find(link => link.rel == "patch_case");
            this.apiService.patchRequest(link.href, patch).subscribe(async (response) => {
              
              this.apiService.postLogMessage(this.case.CaseId, 'Afviser sagen med kommentar (' + data.msg + ')').subscribe();
              await this.toastService.presentPositiveMessage("Sag afvist"); 
              this.router.navigateByUrl('/app/tabs/manager-tab', { replaceUrl: true });

            }, async (error) => {
              await this.toastService.presentNegativeMessage("fejl, kunne ikke afvise sag");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  
  //Handling for user clicked on the assign button
  async assignCase(){
    const alert = await this.alertController.create({
      header: 'Tildel sag',
      buttons: [
        { text: 'Annuller', role: 'cancel' },
        { text: 'Tildel',
          handler: () => {
            let patch = [
              { op:"replace", path:"/statusId", value: 3 },
              { op:"replace", path:"/AssigneeId", value:  this.userid}
            ]

            let link: CaseLink = this.case.links.find(link => link.rel == "patch_case");
            this.apiService.patchRequest(link.href, patch).subscribe(async (response) => {
              
              this.apiService.postLogMessage(this.case.CaseId, 'Tildeler sig selv sagen').subscribe();
              await this.toastService.presentPositiveMessage("Sag tildelt"); 
              this.router.navigateByUrl('/app/tabs/operator-tab', { replaceUrl: true });

            }, async (error) => {
              await this.toastService.presentNegativeMessage("fejl, kunne ikke tildele sag");
            })

          }
        }
      ]
    });

    await alert.present();
  }

  
  //Handling for user clicked on the complete button
  async completeCase(){
    const alert = await this.alertController.create({
      header: 'Afslut sag',
      buttons: [
        { text: 'Annuller', role: 'cancel' },
        { text: 'Afslut',
          handler: () => {
            let patch = [
              { op:"replace", path:"/statusId", value: 4 }
            ]
            let link: CaseLink = this.case.links.find(link => link.rel == "patch_case");
            this.apiService.patchRequest(link.href, patch).subscribe(async (response) => {

              this.apiService.postLogMessage(this.case.CaseId, 'Afslutter sagen').subscribe();
              await this.toastService.presentPositiveMessage("Sag afsluttet"); 
              this.router.navigateByUrl('/app/tabs/operator-tab', { replaceUrl: true });
              
            }, async (error) => {
              await this.toastService.presentNegativeMessage("fejl, kunne ikke afslutte sag");
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
