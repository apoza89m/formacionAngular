import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from '../../core/models/Libro';

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

  constructor() {}

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
}
