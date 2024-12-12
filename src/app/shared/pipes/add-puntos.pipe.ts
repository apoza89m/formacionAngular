import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addPuntos',
  standalone: false,
})
export class AddPuntosPipe implements PipeTransform {
  transform(value: string | number, ...args: unknown[]): string {
    //return (value += '...');
    if (value === 1) return '1 unidad';
    else return (value += ' unidades');
  }
}
