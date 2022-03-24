import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService) { }

  //Implementing of the role guard deciding if the route can be activated based on the users roles
  
  //Decides if a route can be activated
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log("ROLEGUARD canActivate")

    /*
      Getting the current user from auth0 and use map to grap the roles from the user
      and chech if the role from the route data matches with amy of the user roles.
      if there is not a match, gaurd return false and the route is refused and navigates to homepage.
      else the guard returns true and route can be completed.
    */
    return this.authService.user$.pipe(
      map(user => {
        const roles = user['https://sitrep.dk//roles'];
        if (route.data.role && roles.indexOf(route.data.role) === -1) {
          this.toastService.presentNegativeMessage("Du har ikke adgang til denne side");
          this.router.navigateByUrl('/app');
          return false;
        }
        return true;
      }),
      catchError(err => {
        this.router.navigateByUrl('/app');
        return of(false);
      }))
  }

}
