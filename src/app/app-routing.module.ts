import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpositorLibrosComponent } from './pages/expositor-libros/expositor-libros.component';
import { CreacionLibrosComponent } from './pages/creacion-libros/creacion-libros.component';

const routes: Routes = [
  { path: 'expositor', component: ExpositorLibrosComponent },
  { path: 'creacion', component: CreacionLibrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
