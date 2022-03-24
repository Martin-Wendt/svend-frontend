import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    AuthModule.forRoot({ //Setting up Auth0 configuration
      domain: "dev-gsehp47x.eu.auth0.com",
      clientId: "It6VhJJyXxtai5p667I9xdzgk5fjH7U5",
      audience: 'www.sitrep.dk/api',
      scope: 'openid',
      redirectUri: environment.callbackUri,
      cacheLocation: 'localstorage',
      httpInterceptor: {
        allowedList: [
          'https://localhost:7256/api/*',
          'https://localhost:5256/api/*',
          'https://sitrepapi.azurewebsites.net/*',
        ]
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true } //Setting up HTTP Interceptor for all http request
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}