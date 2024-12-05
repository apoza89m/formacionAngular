import { Component } from '@angular/core';

@Component({
  selector: 'app-expositor-libros',
  templateUrl: './expositor-libros.component.html',
  styleUrl: './expositor-libros.component.scss',
})
export class ExpositorLibrosComponent {
  modoElegido: String = 'Visita';

  constructor() {
    console.log('Soy el constructor.');
  }

  ngOnInit(): void {
    console.log('Ejecuto el init.');
  }

  ngAfterViewInit(): void {
    console.log('Vista cargada.');
    this.cambiaModo('Compra');
  }

  ngOnDestroy(): void {
    console.log('Me destruyo.');
  }

  /**
   * Función que cambia el modoElegido
   * @param modo Modo deseado
   */
  cambiaModo(modo: String): void {
    this.modoElegido = modo;
  }
}
