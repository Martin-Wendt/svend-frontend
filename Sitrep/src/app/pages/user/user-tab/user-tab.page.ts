import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { map, take, takeWhile } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Case } from 'src/models/sitrepCase';
import { Cases } from 'src/models/Cases'; 
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.page.html',
  styleUrls: ['./user-tab.page.scss'],
})
export class UserTabPage implements OnInit {

  cases: Cases;
  dataLoading: boolean = false;

  constructor(private apiService: ApiService, private platform: Platform, private authService: AuthService) {
  }
  
  ngOnInit() {
  }

  ////Gets cases from api with filter option
  ionViewWillEnter(){
   this.dataLoading = true
   this.authService.user$.pipe(
     takeWhile((user) => user !== null), 
     map((user) => user.sub))
     .subscribe((id) => {
      const filter = `UserId==${id},StatusId!=6`
      this.apiService.getCases(filter).subscribe((cases) => {
        this.dataLoading = false
        this.cases = cases
      }, (error) =>{
        this.dataLoading = false
      });
   });
  }

  //Angulars option to manage changes in a efficient way
  trackItems(index: number, itemObject: Case) {
    return itemObject.CaseId;
  }

  //Method for loading more item while scolling down the case list
  loadMore(event) {
    let nextPage = this.cases.links.find(link => link.rel == "nextPage");
    if (nextPage == null) {
      if (event) event.target.complete();
      return;
    }

    this.apiService.commonRequest(nextPage.method, nextPage.href).subscribe((data: Cases) => {
      this.cases.links = data.links
      this.cases.value = this.cases.value.concat(data.value)
      if (event) event.target.complete();
    }, (error) => {
      if (event) event.target.complete();
    });
  }

  isWeb() {
    return this.platform.is('desktop');
  }

}
