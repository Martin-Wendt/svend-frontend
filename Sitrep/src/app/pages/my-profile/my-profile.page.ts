import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}

  //Method for the logout logic of the app
  logout() {
    this.authService
    .buildLogoutUrl({ returnTo: environment.callbackUri })
      .pipe(
        tap((url) => {
          this.authService.logout({ localOnly: true }); //Clears the localstorage token
          Browser.open({ url, windowName: '_self' }); //Opens browser with the logouturll from auth0 to clear the browser session
        })
      ).subscribe();
  }

}
