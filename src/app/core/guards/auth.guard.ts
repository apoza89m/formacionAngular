import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  canActivate(): boolean {
    console.log('Ejecuto guard.');
    const isAuthenticated = this.checkAuthentication();
    if (!isAuthenticated) {
      this.openSnackBar('Debe loguearse primero.', 'Cerrar');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  private checkAuthentication(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) return true;
    else return false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 3000,
      })
      .onAction()
      .subscribe(() => {
        this._snackBar.dismiss();
      });
  }
}
