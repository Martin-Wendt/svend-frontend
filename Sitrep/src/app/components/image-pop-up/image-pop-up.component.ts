import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-pop-up',
  templateUrl: './image-pop-up.component.html',
  styleUrls: ['./image-pop-up.component.scss'],
})
export class ImagePopUpComponent implements OnInit {

  imgSrc;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }
}
