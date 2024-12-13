import { Component, inject } from '@angular/core';
import { Libro } from '../../core/models/Libro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibroService } from '../../core/services/libro.service';
import { Subscription } from 'rxjs';
import { Autor } from '../../core/models/Autor';

@Component({
  selector: 'app-expositor-libros',
  templateUrl: './expositor-libros.component.html',
  styleUrl: './expositor-libros.component.scss',
})
export class ExpositorLibrosComponent {
  modoElegido: string = 'Compra';

  /*misLibros: String[] = [
    'El Hijo del Traidor',
    'Amazon Redshift',
    'Amazona',
    'Los niños del Amazonas',
    'El secreto de la highlander',
    'No es lo que parece',
    'Tigre Ratón Fresa',
    'El enigma de Darwin',
    'La isla de la Mujer Dormida',
  ];*/

  misLibros: Libro[];
  librosComprado: Libro[] = [];
  autores: Array<Autor>;
  columnas: string[] = ['Nombre', 'Edad', 'Cantidad libros publicados'];
  modelos: string[] = ['nombre', 'edad', 'cantidadLibrosPublicados'];

  subscriptionBorrado: Subscription;

  private _snackBar = inject(MatSnackBar);

  constructor(private libroService: LibroService) {
    console.log('Soy el constructor.');
    console.log('Mi libro favorito: ' + this.libroService.favorito);
    this.libroService.favorito = 'Choque de reyes';
    this.libroService.tituloWeb.next('Expositor');

    const autor1: Autor = {
      nombre: 'Pepe',
      edad: 50,
      cantidadLibrosPublicados: 3,
    };
    const autor2: Autor = {
      nombre: 'Ramon',
      edad: 47,
      cantidadLibrosPublicados: 2,
    };
    const autor3: Autor = {
      nombre: 'Manolo',
      edad: 67,
      cantidadLibrosPublicados: 7,
    };

    this.autores = [autor1, autor2, autor3];
  }

  ngOnInit(): void {
    console.log('Ejecuto el init.');

    this.subscriptionBorrado = this.libroService
      .getLibros()
      .subscribe((libros) => {
        this.misLibros = libros;
      });
  }

  ngAfterViewInit(): void {
    console.log('Vista cargada.');
  }

  ngOnDestroy(): void {
    console.log('Me destruyo.');

    // Queremos que todas las subscripciones se terminen
    this.subscriptionBorrado.unsubscribe();
  }

  /**
   * Función que cambia el modoElegido
   * @param modo Modo deseado
   */
  cambiaModo(modo: string): void {
    this.modoElegido = modo;
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

  lanzaNotificacion(libroComprado: Libro) {
    this.openSnackBar('Libro comprado: ' + libroComprado.titulo, 'Cerrar');
    this.librosComprado.push(libroComprado);
  }
}
