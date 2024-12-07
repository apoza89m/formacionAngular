import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  sesion: boolean;

  ngOnInit() {
    const token: string = sessionStorage.getItem('token');
    this.sesion = token !== null;
  }

  iniciarSesion() {
    sessionStorage.setItem('token', '1');
    this.sesion = true;
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    this.sesion = false;
  }
}
