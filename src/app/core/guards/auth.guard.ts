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
      this.router.navigate(['/usuario/login']);
      return false;
    }
    return true;
  }

  private checkAuthentication(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('token');
      return token !== null;
    } else return false;
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
