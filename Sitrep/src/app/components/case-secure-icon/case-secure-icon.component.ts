import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-case-secure-icon',
  templateUrl: './case-secure-icon.component.html',
  styleUrls: ['./case-secure-icon.component.scss'],
})
export class CaseSecureIconComponent implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async promtInfo() {
    const alert = await this.alertController.create({
      header: 'Forbindelsen er sikker',
      message: 'Dine oplysninger er private, når de sendes til dette webiste',
      buttons: ['OK']
    });

    await alert.present();
  }
}
