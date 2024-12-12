import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { LibroService } from '../../core/services/libro.service';

@Directive({
  selector: '[appDecoraEtiquetas]',
  standalone: false,
})
export class DecoraEtiquetasDirective {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private libroService: LibroService
  ) {
    console.log('He invocado mi directiva: ' + this.elementRef.nativeElement);
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    const titulo: string = this.elementRef.nativeElement.innerHTML;
    const stock = this.libroService.recuperaStockSegunTitulo(titulo);
    const sinopsis = this.libroService.recuperaSinopsisSegunTitulo(titulo);
    this.renderer.addClass(this.elementRef.nativeElement, 'colorRojo');

    // Crear un nuevo elemento para la sinopsis
    const sinopsisElement = this.renderer.createElement('div');
    this.renderer.addClass(sinopsisElement, 'sinopsis');
    const textoSinopsis = this.renderer.createText(sinopsis);
    // Insertar el texto en el nuevo elemento
    this.renderer.appendChild(sinopsisElement, textoSinopsis);
    // Agregarlo debajo del título si aún no existe
    const parent = this.elementRef.nativeElement.parentElement;
    const existingSinopsis = parent.querySelector('.sinopsis');
    if (!existingSinopsis) {
      this.renderer.appendChild(parent, sinopsisElement);
    }

    this.libroService.openSnackBar('El stock es: ' + stock, 'Cerrar');
  }
}
