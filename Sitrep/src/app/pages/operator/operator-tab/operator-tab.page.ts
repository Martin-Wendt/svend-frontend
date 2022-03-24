import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Case } from 'src/models/sitrepCase';
import { Cases } from 'src/models/Cases';
import { map, takeWhile } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-operator-tab',
  templateUrl: './operator-tab.page.html',
  styleUrls: ['./operator-tab.page.scss'],
})
export class OperatorTabPage implements OnInit {

  cases: Cases;
  filterDropdown: number = 3;
  dataLoading: boolean = false;
  userid: string;
  
  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  async ngOnInit() {
    await this.authService.user$.pipe(
      takeWhile((user) => user !== null), 
      map((user) => {
        this.userid = user.sub
      })).subscribe();
  }

  ionViewWillEnter() {
    this.getCases();
  }

  //Gets cases from api with filter option
  getCases(){
    this.dataLoading = true
    const filter = () => {
      switch (this.filterDropdown) {
        case 2: 
          return "StatusId==2"
        case 3:
          return `AssigneeId==${this.userid}`
     }
    }
    this.apiService.getCases(filter()).subscribe((cases) => {
      this.cases = cases
      this.dataLoading = false
    }, (error) =>{
      this.dataLoading = false
    });
  }

  changeFilter() {
    this.dataLoading = true
    this.getCases()
  }

  //Angulars option to manage changes in a efficient way
  trackItems(index: number, itemObject: Case) {
    return itemObject.CaseId;
  }
  
  //Custom method to select a option in the list onload
  compareFn(e1: number, e2: number): boolean {
    return e1 == e2;
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
}
