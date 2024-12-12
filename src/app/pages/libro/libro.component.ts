import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from '../../core/models/Libro';
import { LibroService } from '../../core/services/libro.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EdicionLibroComponent } from '../edicion-libro/edicion-libro.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss',
})
export class LibroComponent {
  // Recoge información libro del componente padre
  @Input() libro: Libro;

  @Input() modoElegido: string;

  // Envia un evento al padre
  @Output() notificacionCompra: EventEmitter<Libro> = new EventEmitter();

  @Input() modoLectura: boolean = false;

  constructor(private libroService: LibroService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.libro);
  }

  comprar() {
    if (this.remove()) {
      this.notificacionCompra.emit(this.libro);
    }
  }

  add() {
    this.libro.stock++;
  }

  remove(): boolean {
    if (this.libro.stock > 0) {
      this.libro.stock--;
      return true;
    }
    return false;
  }

  editar() {
    const configDialog: MatDialogConfig = {
      data: {
        libro: this.libro,
      },
    };
    const dialogRef = this.dialog.open(EdicionLibroComponent, configDialog);
    dialogRef.afterClosed().subscribe((libroUpdated) => {
      this.libro = libroUpdated;
      console.log(`Resultado del dialog: ${libroUpdated}`);
    });
  }

  eliminar() {
    this.libroService.eliminaLibro(this.libro).subscribe((resultado) => {
      console.log('Borrado: ' + resultado);
    });
  }
}
