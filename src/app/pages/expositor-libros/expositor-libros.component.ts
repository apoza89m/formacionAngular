import { Component, inject } from '@angular/core';
import { Libro } from '../../core/models/Libro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibroService } from '../../core/services/libro.service';

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

  private _snackBar = inject(MatSnackBar);

  constructor(private libroService: LibroService) {
    console.log('Soy el constructor.');
    console.log('Mi libro favorito: ' + this.libroService.favorito);
    this.libroService.favorito = 'Choque de reyes';
  }

  ngOnInit(): void {
    console.log('Ejecuto el init.');
    this.libroService.getLibros().subscribe((libros) => {
      this.misLibros = libros;
    });
  }

  ngAfterViewInit(): void {
    console.log('Vista cargada.');
  }

  ngOnDestroy(): void {
    console.log('Me destruyo.');
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
