import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  //Service for showing toast messages all across the app

  //show a positive toast message
  async presentPositiveMessage(msg: string, duration: number = 2000, icon: string = 'checkmark-circle-outline'){
    const toast = await this.toastController.create({
      message: msg,
      icon: icon,
      position: 'top',
      color: "success",
      duration: duration
    });
    toast.present();
  }

  //show a negative toast message
  async presentNegativeMessage(msg: string, duration: number = 2000, icon: string = 'alert-circle-outline'){
    const toast = await this.toastController.create({
      message: msg,
      icon: icon,
      position: 'top',
      color: "danger",
      duration: duration
    });
    toast.present();
  }
}
