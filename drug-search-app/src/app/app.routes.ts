import { Routes } from '@angular/router';

<<<<<<< HEAD
export const routes: Routes = [];
=======
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  {
    path: 'drugs',
    loadComponent: () => import('./drugs').then(m => m.DrugsComponent)
  } 
];
>>>>>>> develop
