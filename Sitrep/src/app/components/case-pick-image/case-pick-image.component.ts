import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { CaseImage } from 'src/models/CaseImage';
import { Case } from 'src/models/sitrepCase';
import { ImagePopUpComponent } from '../image-pop-up/image-pop-up.component';

export interface BlobImage {
  Blob: Blob, 
  Src: SafeUrl, 
  caseImageId?: number,
  tempId?: string,
  loading?: boolean
  deleting?: boolean
}

@Component({
  selector: 'app-case-pick-image',
  templateUrl: './case-pick-image.component.html',
  styleUrls: ['./case-pick-image.component.scss'],
})
export class CasePickImageComponent implements OnInit {

  @Output() newImagesAdded = new EventEmitter<BlobImage[]>();
  @Input()case: Case;
  @Input()readOnly: boolean = false;
  blobImages: BlobImage[] = [];
  
  constructor(private apiService: ApiService, 
    private toastService: ToastService, 
    public sanitizer: DomSanitizer, 
    private modalController: ModalController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.case?.CaseImages?.map((image: CaseImage) => {
      //adding empty BlobImage object to blobimages array, to get the loading effect displaying for the user
      this.blobImages.push({Blob: null, Src: null, caseImageId: image.caseImageId, loading: true});

      //Gets image for a case from api
      let index = this.blobImages.findIndex(item => item.caseImageId == image.caseImageId);
      this.apiService.getImage(image.caseImageId).subscribe((imageBlob) => {
        this.blobImages[index].Blob = imageBlob
        this.blobImages[index].Src = this.convertBlobToURL(imageBlob)
        this.blobImages[index].loading = false
      }, () => {
        this.blobImages.splice(index, 1)
      });
    })
  }

  //Handling for user clicked on the pickImages button
  async pickImages() {
    await Camera.getPhoto({ quality: 50, resultType: CameraResultType.Uri }).then(async (photo: Photo) => {
      
      //Shows loading modal while uploading image
      const loading = await this.loadingController.create({
        message: 'Vent mens billede uploader',
        spinner: 'crescent'
      });
      await loading.present();

      const saveForm: FormData = new FormData();
      let blob = await fetch(photo.webPath).then(r => r.blob()) //generate blob of image
      saveForm.append("file", blob);
      
      let tempid = Math.random().toString(36); //temporarily id for image
      this.blobImages.push({Blob: blob, Src: this.convertBlobToURL(blob), tempId: tempid, loading: true }) //adding empty BlobImage object to blobimages array, to get the loading effect displaying for the user

      let index = this.blobImages.findIndex(item => item.tempId == tempid); //get index for temporarily BlobImage object
      this.apiService.postImage(saveForm, this.case?.CaseId).subscribe(async (item: CaseImage) => {
        this.blobImages[index].caseImageId = item.caseImageId;
        this.blobImages[index].loading = false;
        loading.dismiss(); //hiding loading modal 

        await this.toastService.presentPositiveMessage("Billede tilføjet");
        this.newImagesAdded.emit(this.blobImages); //emits event for components

      }, async (error) => {
        loading.dismiss(); //hiding loading modal 
        this.blobImages.splice(index, 1);
        await this.toastService.presentNegativeMessage("Fejl, kunne ikke uploade billede");

      });

    })
    .catch((error) => {
      //catch if error is thrown then image modal i dismissed by the user
    });
  }

  //Method for deleting image
  async deleteImage(image: BlobImage) {
    image.deleting = true //disables the delete button
    
    this.apiService.deleteImage(image.caseImageId).subscribe(async () => {
      this.blobImages.splice(this.blobImages.indexOf(image), 1)
      await this.toastService.presentPositiveMessage("Billede slettet");
      this.newImagesAdded.emit(this.blobImages);
    }, async (error) => {
      image.deleting = false
      await this.toastService.presentNegativeMessage("Fejl, kunne ikke slette billede");
    })
  }
  
  //Method for converting a blob to blob url
  convertBlobToURL(blob: Blob): SafeUrl {
    let objectURL = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }

  //Method for showing image as fullscreen
  async imagePopUpModal(blobSrc){
    const modal = await this.modalController.create({
      component: ImagePopUpComponent,
      componentProps: { 
        imgSrc: blobSrc
      },
      swipeToClose: true
    });
    return await modal.present();
  }
}
