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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibroComponent } from './pages/libro/libro.component';
import { LibroService } from './core/services/libro.service';
import { EdicionLibroComponent } from './pages/edicion-libro/edicion-libro.component';
import { AddPuntosPipe } from './shared/pipes/add-puntos.pipe';
import { DecoraEtiquetasDirective } from './shared/directives/decora-etiquetas.directive';
import { ConversionInputDirective } from './shared/directives/conversion-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExpositorLibrosComponent,
    CreacionLibrosComponent,
    NotFoundComponent,
    LibroComponent,
    EdicionLibroComponent,
    AddPuntosPipe,
    DecoraEtiquetasDirective,
    ConversionInputDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration(), AuthGuard, LibroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
