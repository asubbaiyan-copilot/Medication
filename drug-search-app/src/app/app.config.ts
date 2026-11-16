import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { DRUG_SERVICE } from './features/drug-entry/services/IDrugService';
import { DrugService } from './features/drug-entry/services/drug.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    { provide: DRUG_SERVICE, useClass: DrugService }
  ]
};
