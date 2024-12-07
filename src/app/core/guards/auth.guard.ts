import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('Ejecuto guard.');
    const isAuthenticated = this.checkAuthentication();
    if (!isAuthenticated) {
      this.router.navigate(['/expositor']);
      return false;
    }
    return true;
  }

  private checkAuthentication(): boolean {
    // Implementa tu lógica de autenticación aquí
    return true; // Cambia esto según tu lógica
  }
}