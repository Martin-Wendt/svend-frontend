import { Component, OnInit } from '@angular/core';
import { CaseImage } from 'src/models/CaseImage';

@Component({
  selector: 'app-user-tab-create',
  templateUrl: './user-tab-create.page.html',
  styleUrls: ['./user-tab-create.page.scss'],
})
export class UserTabCreatePage implements OnInit {

  imagesIds: CaseImage[];

  constructor() {
  }

  ngOnInit() {

  }

  //Method for handling event comming for the image component
  newImagesAdded(event){
    const _imagesIds = event.map((item) => {return {caseImageId: item.caseImageId}} );
    this.imagesIds = _imagesIds
  }

}
