import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpositorLibrosComponent } from './pages/expositor-libros/expositor-libros.component';
import { CreacionLibrosComponent } from './pages/creacion-libros/creacion-libros.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/expositor', pathMatch: 'full' }, // Redirección inicial
  { path: 'expositor', component: ExpositorLibrosComponent },
  {
    path: 'creacion',
    component: CreacionLibrosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
