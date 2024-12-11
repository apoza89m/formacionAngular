import { Component } from '@angular/core';
import { LibroService } from '../../core/services/libro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from '../../core/models/Libro';

@Component({
  selector: 'app-creacion-libros',
  templateUrl: './creacion-libros.component.html',
  styleUrl: './creacion-libros.component.scss',
})
export class CreacionLibrosComponent {
  libroForm: FormGroup;
  libroPrevisualizado?: Libro;

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    console.log('Mi libro favorito: ' + this.libroService.favorito);
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      autor: [''],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(1)]],
    });
  }

  cerrarPrevisualizacion(): void {
    this.libroPrevisualizado = undefined;
  }

  addLibro(): void {
    if (this.libroForm.valid) {
      this.libroService.addLibro(this.libroForm.value).subscribe(() => {
        this.libroService.openSnackBar('Libro agregado con éxito', 'Cerrar');
        const nuevoLibro: Libro = this.libroForm.value;
        this.libroPrevisualizado = nuevoLibro;
        this.libroForm.reset(); // Resetea el formulario
      });
    } else {
      this.libroService.openSnackBar(
        'Por favor, complete el formulario correctamente.',
        'Cerrar'
      );
    }
  }
}
