import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'formacionAngular';

  sesion: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  isLogged() {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      return token !== null;
    }
    return false;
  }
}
