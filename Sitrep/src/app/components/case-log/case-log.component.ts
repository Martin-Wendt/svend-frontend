import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { Case } from 'src/models/sitrepCase';

@Component({
  selector: 'app-case-log',
  templateUrl: './case-log.component.html',
  styleUrls: ['./case-log.component.scss'],
})
export class CaseLogComponent {

  @Input()case: Case;
  @Input()readOnly: boolean = false;

  constructor(private alertController: AlertController, private apiService: ApiService, private toastService: ToastService, private router: Router) {
  }

  //Handling for user clicked on the addLogMessage button
  async addLogMessage() {
    const alert = await this.alertController.create({
      header: 'Log besked',
      message: 'Tilføj besked ',
      inputs: [
        { name: 'msg', placeholder: 'Besked', type: 'text' }
      ],
      buttons: [
        { text: 'Annuller', role: 'cancel' },
        { text: 'Tilføj',
          handler: (data) => {
            this.apiService.postLogMessage(this.case.CaseId, data.msg).subscribe(async () => {
              await this.toastService.presentPositiveMessage("Log besked tilføjet");
              this.router.navigateByUrl('/app', { replaceUrl: true });
            }, async (error) => {
              await this.toastService.presentNegativeMessage("fejl, kunne ikke godkende sag");
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
