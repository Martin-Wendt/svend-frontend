import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Case } from 'src/models/sitrepCase';
import { Cases } from 'src/models/Cases';

@Component({
  selector: 'app-manager-tab',
  templateUrl: './manager-tab.page.html',
  styleUrls: ['./manager-tab.page.scss'],
})
export class ManagerTabPage {

  cases: Cases;
  filterDropdown: number = 1;
  dataLoading: boolean = false;

  constructor(private apiService: ApiService) {
  }

  ionViewWillEnter() {
    this.getCases()
  }

  //Gets cases from api with filter option
  getCases(){
    this.dataLoading = true
    const filter = () => {
      switch (this.filterDropdown) {
        case -1:
          return `StatusId>=0`
        default: 
          return `StatusId==${this.filterDropdown}`
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
