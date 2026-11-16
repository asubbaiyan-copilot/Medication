import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  {
    path: 'entry',
    loadComponent: () => import('./features/drug-entry/drug-entry').then(m => m.DrugEntryComponent)
  },
  {
    path: 'drugs',
    loadComponent: () => import('./drugs').then(m => m.DrugsComponent)
  } 
];
