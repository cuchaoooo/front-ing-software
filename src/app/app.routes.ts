import { Routes } from '@angular/router';
import { FestivosComponent } from './festivos/festivos.component';
import { PaisesComponent } from './paises/paises.component';

export const routes: Routes = [
  { path: 'festivos', component: FestivosComponent },
  { path: 'paises', component: PaisesComponent },
  { path: '', redirectTo: '/festivos', pathMatch: 'full' }
];