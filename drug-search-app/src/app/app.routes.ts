import { Routes } from '@angular/router';
import { ViewPharmacySearchComponent } from './view-pharmacy-search-component/view-pharmacy-search-component';

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
  } ,
  {
    path: 'template-form',
    loadComponent: () => import('./template-form/template-form').then(m => m.TemplateForm)
  },
  {
    path: 'reactive-form',
    loadComponent: () => import('./reactive-form/reactive-form').then(m => m.ReactiveForm)
  },
  {
    path: 'pharmacy-search/:id',
    component: ViewPharmacySearchComponent
  },
  {
    path: 'material-form',
    loadComponent: () => import('./view-material-form/view-material-form').then(m => m.ViewMaterialForm)
  }
];
