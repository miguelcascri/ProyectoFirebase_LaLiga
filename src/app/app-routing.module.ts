import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipos.module').then( m => m.EquiposPageModule)
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },
  {
    path: 'ligas',
    loadChildren: () => import('./ligas/ligas.module').then( m => m.LigasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
