import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home').then(m => m.HomeComponent)
  },
  {
    path: 'entry',
    loadComponent: () => import('./features/drug-entry/presentation/drug-entry').then(m => m.DrugEntryComponent)
  },
  {
    path: 'drugs',
    loadComponent: () => import('./features/drugs/presentation/drugs').then(m => m.DrugsComponent)
  } ,
  {
    path: 'pharmacies',
    loadComponent: () => import('./features/pharmacys/presentation/pharmacies/pharmacies').then(m => m.Pharmacies)
  } 
];
