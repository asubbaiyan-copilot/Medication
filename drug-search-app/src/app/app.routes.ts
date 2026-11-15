import { Routes } from '@angular/router';

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
