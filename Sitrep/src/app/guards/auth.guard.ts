import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  //Implementing of the auth guard deciding if the route can be activated or loaded based on the users login state

  /*
    canLoad decides if children can be loaded.
    if the isAuthenticated state is false, the gaurd return false and the route is refused 
    otherwise the guard returns true and route can be completed
  */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    console.log("GUARD canLoad")
    return this.auth.isAuthenticated$.pipe(take(1));
  }
  
  /*
    canActivate Decides if a route can be activated
    if the redirectIfUnauthenticated returns false, the gaurd return false and the route is refused 
    otherwise the redirectIfUnauthenticated returns true and route can be completed.
  */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("GUARD canActivate")
    return this.redirectIfUnauthenticated();
  }
  
  /*
    canActivateChild Decides if a route can be activated
    if the redirectIfUnauthenticated returns false, the gaurd return false and the route is refused 
    otherwise the redirectIfUnauthenticated returns true and route can be completed.
  */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("GUARD canActivateChild")
    return this.redirectIfUnauthenticated();
  }

  /*
    Method using tap to perform a side effect for the observable. The method returns the isAuthenticated state true/false.
    if the isAuthenticated state is false, the router redirects to the login page.
  */
  private redirectIfUnauthenticated(): Observable<boolean> {
    console.log("redirectIfUnauthenticated")
    return this.auth.isAuthenticated$.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      })
    );
  }

}

