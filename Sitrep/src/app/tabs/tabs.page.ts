import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  showManagerTab: boolean = true;
  showOperatorTab: boolean = true;

  constructor(private authService: AuthService) {
    /*
      Gets the user obervable and if diffrent than null then we maps the roles, 
      to perform a check on the roles permission for showing and hiding the tabs elements
    */
    this.authService.user$.pipe(
      takeWhile((user) => user !== null), 
      map((e) => e['https://sitrep.dk//roles']))
      .subscribe((roles: string[]) => {
        if (roles.indexOf('Operator') === -1) {
          this.showOperatorTab = false
        }
        if (roles.indexOf('Manager') === -1) {
          this.showManagerTab = false
        }
      })
  }

}
