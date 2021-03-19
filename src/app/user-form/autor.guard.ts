import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InjectSetupWrapper } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';


@Injectable()
export class AutorGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  // tslint:disable-next-line: no-trailing-whitespace

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean| Observable<boolean> | Promise<boolean> {
    const isAutor = this.userService.getAutor();
    if (!isAutor) {
      this.router.navigate(['/products']);
    }
    return isAutor;
  }

}
