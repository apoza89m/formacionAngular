import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface TipoLoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  sesion: boolean;

  formLogin: FormGroup<TipoLoginForm>;

  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token: string = sessionStorage.getItem('token');
      this.sesion = token !== null;
    } else {
      this.sesion = false;
    }

    this.formLogin = new FormGroup<TipoLoginForm>({
      email: new FormControl('valor_por_defecto@example.com', [
        Validators.required,
        Validators.minLength(5),
        Validators.email,
      ]),
      password: new FormControl('1234', [Validators.required]),
    });

    this.formLogin.markAllAsTouched();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 3000,
        panelClass: 'custom-snack-bar', // Clase personalizada
      })
      .onAction()
      .subscribe(() => {
        this._snackBar.dismiss();
      });
  }

  iniciarSesion() {
    if (this.formLogin.valid) {
      const valorEmail: string = this.formLogin.get('email').value;
      const valorPassword: string = this.formLogin.value.password;

      if (
        valorEmail === 'valor_por_defecto@example.com' &&
        valorPassword === '1234'
      ) {
        sessionStorage.setItem('token', '1');
        this.sesion = true;
        this.router.navigate(['creacion']);
      } else {
        this.openSnackBar('Datos incorrectos', 'Cerrar');
      }
    }
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    this.sesion = false;
  }
}
