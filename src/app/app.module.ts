import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { ExpositorLibrosComponent } from './pages/expositor-libros/expositor-libros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreacionLibrosComponent } from './pages/creacion-libros/creacion-libros.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpositorLibrosComponent,
    CreacionLibrosComponent,
    NotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [provideClientHydration(), AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
