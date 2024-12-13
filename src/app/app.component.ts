import { Component } from '@angular/core';
import { LibroService } from './core/services/libro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'formacionAngular';

  tituloNavegacion: string = 'Mi libreria';

  sesion: boolean = false;

  constructor(private libroServioce: LibroService) {
    this.libroServioce.tituloWeb.subscribe((nuevoTitulo) => {
      this.tituloNavegacion = nuevoTitulo;
    });
  }

  ngOnInit() {}

  isLogged() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
}
