import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { DrugRepository } from './features/drug-entry/application/ports/drug-repository';
import { HttpDrugRepository } from './features/drug-entry/infrastructure/http-drug.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    { provide: DrugRepository, useClass: HttpDrugRepository }
  ]
};
