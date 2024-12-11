import { inject, Injectable } from '@angular/core';
import { Libro } from '../models/Libro';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  favorito: string = 'Fuego y Sangre';
  private _snackBar = inject(MatSnackBar);
  misLibros: Libro[];

  constructor() {
    const libro1: Libro = {
      titulo: 'El Hijo del Traidor',
      autor: 'Autor 1',
      precio: 10,
      stock: 5,
    };

    const libro2: Libro = {
      titulo: 'Amazon Redshift',
      precio: 15,
      stock: 7,
    };

    const libro3: Libro = {
      titulo: 'Amazona',
      autor: 'Autor 3',
      precio: 12,
      stock: 4,
    };

    const libro4: Libro = {
      titulo: 'Los niños del Amazonas',
      autor: 'Autor 4',
      precio: 20,
      stock: 6,
    };

    const libro5: Libro = {
      titulo: 'El secreto de la highlander',
      autor: 'Autor 5',
      precio: 18,
      stock: 3,
    };

    const libro6: Libro = {
      titulo: 'No es lo que parece',
      autor: 'Autor 6',
      precio: 8,
      stock: 9,
    };

    const libro7: Libro = {
      titulo: 'Tigre Ratón Fresa',
      autor: 'Autor 7',
      precio: 14,
      stock: 8,
    };

    const libro8: Libro = {
      titulo: 'El enigma de Darwin',
      autor: 'Autor 8',
      precio: 22,
      stock: 2,
    };

    const libro9: Libro = {
      titulo: 'La isla de la Mujer Dormida',
      autor: 'Autor 9',
      precio: 25,
      stock: 1,
    };

    this.misLibros = [
      libro1,
      libro2,
      libro3,
      libro4,
      libro5,
      libro6,
      libro7,
      libro8,
      libro9,
    ];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 3000,
        //panelClass: 'custom-snack-bar', // Clase personalizada
      })
      .onAction()
      .subscribe(() => {
        this._snackBar.dismiss();
      });
  }

  getLibros(): Observable<Libro[]> {
    return new Observable((observer) => {
      // Llamada a mi backend
      setTimeout(() => {
        observer.next(this.misLibros);
        observer.complete();
      }, 2000);
    });
  }

  addLibro(nuevoLibro: Libro): Observable<void> {
    return new Observable((observer) => {
      this.misLibros.push(nuevoLibro);
      observer.next();
      observer.complete();
    });
  }
}
