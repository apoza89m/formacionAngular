import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  sesion: boolean;
  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token: string = sessionStorage.getItem('token');
      this.sesion = token !== null;
    } else {
      this.sesion = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 3000,
        panelClass: 'custom-snack-bar', // Puedes añadir una clase personalizada
      })
      .onAction()
      .subscribe(() => {
        // Cerrar el snack bar cuando se haga clic en la acción
        this._snackBar.dismiss();
      });
  }

  iniciarSesion() {
    sessionStorage.setItem('token', '1');
    this.sesion = true;
    this.router.navigate(['creacion']);
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    this.sesion = false;
  }
}
