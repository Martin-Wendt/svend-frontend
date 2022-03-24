import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { delay, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  obervableForLogin = null
  userClosedBrowser: boolean = false;

  constructor(private authService: AuthService, private router: Router, public cd: ChangeDetectorRef) { 
  }

  ngOnInit() {
    Browser.addListener('browserFinished', () => {
      this.userClosedBrowser = true;
      this.cd.detectChanges(); //Used to trigger detect changes for a view 
    })

    this.login();
  }

  ngOnDestroy() {
    if (this.obervableForLogin !== null) {
      this.obervableForLogin.unsubscribe();
    }
  }

  //Method for the login logic of the app
  login() {
    this.obervableForLogin = this.authService.isAuthenticated$.pipe(
      tap((loggedIn) => {
        if (loggedIn) {
          this.router.navigateByUrl('/app', { replaceUrl: true });
        } else {
          this.authService
          .buildAuthorizeUrl()
          .pipe(
            delay(500), //wait 500ms, to make sure transistion effect is finished
            mergeMap((url) => Browser.open({ url, windowName: '_self' }))
            )
          .subscribe();
        }
      })
    ).subscribe();
  }

}
