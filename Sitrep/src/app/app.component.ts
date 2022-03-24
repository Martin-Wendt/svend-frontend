import { Component, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import localeDK from '@angular/common/locales/da';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
registerLocaleData(localeDK, 'da-dk');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private ngZone: NgZone, private router: Router, private platform: Platform) {}

  ngOnInit(): void {
    //Adding listner for all browsers that the app opens
    App.addListener('appUrlOpen', ({ url }) => {
      console.log("appUrlOpen event triggered with url: ", url)

      this.ngZone.run(() => {
        /*
          Here we check for if the incomming url starts with, what is configured as the callback url for auth0
          and checks if we have state and error or code.

          if so we call handleRedirectCallback to handle success and error responses from Auth0 and closes the browser.

          else we peform a close method on the browser element. 
        */
        if (url?.startsWith(environment.callbackUri)) {
          if (url.includes('state=') && (url.includes('error=') || url.includes('code='))) {
            this.auth.handleRedirectCallback(url)
            .pipe(mergeMap(() => {
              if (this.platform.is('ios')) return Browser.close();
            }))
            .subscribe();
          } else {
            if (this.platform.is('ios')) Browser.close();
            this.router.navigateByUrl('/login');
          }
        }
      });
    });

  }

}
