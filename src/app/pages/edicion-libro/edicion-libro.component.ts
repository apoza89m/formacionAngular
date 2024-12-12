import { Component, Inject } from '@angular/core';
import { Libro } from '../../core/models/Libro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LibroService } from '../../core/services/libro.service';

@Component({
  selector: 'app-edicion-libro',
  standalone: false,

  templateUrl: './edicion-libro.component.html',
  styleUrl: './edicion-libro.component.scss',
})
export class EdicionLibroComponent {
  libro: Libro;
  libroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    public dialogRef: MatDialogRef<EdicionLibroComponent>,
    // Este data es el libro injectado
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.libro = data.libro;
  }

  ngOnInit(): void {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required]],
      autor: [''],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      stock: [null, [Validators.required, Validators.min(1)]],
    });

    // Rellenar los campos con los datos del libro
    this.libroForm.setValue(this.libro);
  }

  cancelar() {
    // Mandar libro original si se cancela
    this.dialogRef.close(this.libro);
  }

  guardar() {
    if (this.libroForm.valid) {
      //Primero guardamos en la base de datos y luego actualizamos el cliente
      this.libroService
        .updateLibro(this.libro, this.libroForm.value)
        .subscribe((libroPersistido) => {
          this.libro = libroPersistido;
          //this.libro.titulo = libroPersistido.get('titulo').value;
          this.dialogRef.close(this.libro);
        });
    }
  }
}
