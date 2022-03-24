import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import { CaseImage } from 'src/models/CaseImage';
import { CaseLink } from 'src/models/CaseLink';
import { Case } from 'src/models/sitrepCase';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss'],
})
export class CaseFormComponent implements OnInit {

  @Input() case: Case;
  @Input() readOnly: boolean = false;
  @Input() newCaseToCreate: boolean = false;
  @Input() newCaseToCreateImageIds: CaseImage[];
  form: FormGroup;
  loading: boolean

  get formValue() {
    return this.form.value as Case;
  }

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    private alertController: AlertController,
    private router: Router) {
  }

  ngOnInit(): void {
    //Creates the form
    this.form = this.formBuilder.group({
      UserId: [null],
      Title: [{ value: '', disabled: this.readOnly }, [Validators.required]],
      Location: [{ value: '', disabled: this.readOnly }, [Validators.required]],
      Description: [{ value: '', disabled: this.readOnly }, [Validators.required]],
      PriorityId: [0],
      StatusId: [0],
      AssigneeId: [null],
      CaseImages: [[]],
    })
    this.form.patchValue(this.case) //updates the form with case object 
  }

  //Handling for user clicked on the save/create button
  async onSubmit() {
    if (!this.form.valid) {
      await this.toastService.presentNegativeMessage("Udfyld alle informationerne")
      return false;
    }
    console.log("CaseForm onSubmit");
    this.loading = true

    if (this.newCaseToCreate) {
      this.form.value.Images = this.newCaseToCreateImageIds //set ids for appended images for the case
      
      this.apiService.postCase(this.formValue).subscribe(async () => {
        await this.toastService.presentPositiveMessage("Sag oprettet");
        this.router.navigateByUrl('/app');
      }, async (error) => {
        this.loading = false
        await this.toastService.presentNegativeMessage("Kunne ikke oprette sag, prøv igen");
      })
    } else {
      let link: CaseLink = this.case.links.find(link => link.rel == "update_case");

      this.apiService.commonRequest(link.method, link.href, this.formValue).subscribe(async () => {
        await this.toastService.presentPositiveMessage("Sag opdateret");
        this.loading = false
      }, async (error) => {
        this.loading = false
        await this.toastService.presentNegativeMessage("Kunne ikke opdatere sag, prøv igen");
      });
    }

  }

  //Handling for user clicked on the delete button
  async onDelete() {
    const alert = await this.alertController.create({
      header: 'Er du sikker på du vil slette sagen?',
      buttons: [
        {
          text: 'Annuller',
          role: 'cancel',
        }, {
          text: 'Slet',
          handler: () => {
            this.loading = true
            let link: CaseLink = this.case.links.find(link => link.rel == "delete_case");
            
            this.apiService.commonRequest(link.method, link.href).subscribe(async () => {
              await this.toastService.presentPositiveMessage("Sag slettet");
              this.router.navigateByUrl('/app', { replaceUrl: true });
            }, async (error) => {
              this.loading = false
              await this.toastService.presentNegativeMessage("fejl, kunne ikke slette sag");
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
