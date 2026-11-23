import { ApplicationConfig, provideBrowserGlobalErrorListeners, Type } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { logInterceptor } from './log.interceptor';
import { withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { DrugRepository } from './features/drug-entry/application/ports/drug-repository';
import { HttpDrugRepository } from './features/drug-entry/infrastructure/http-drug.repository';
import { HttpPharmacyRepository } from './features/pharmacys/application/ports/http-pharmacy.repository';
import { PharmacyRepository } from './features/pharmacys/services/pharmacy-repository';
import { HttpDocurackRepository } from './features/pharmacys/application/ports/http-docurack.repository';
import { DocutrackRepository } from './features/pharmacys/services/docutrack-repository';
import { HttpLtcRepository } from './features/pharmacys/application/ports/http-ltc.repository';
import { LtcRepository } from './features/pharmacys/services/ltc-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient( withInterceptors([logInterceptor]) ),
    { provide: DrugRepository, useClass: HttpDrugRepository },
    { provide: PharmacyRepository, useClass: HttpPharmacyRepository},
    { provide: DocutrackRepository, useClass: HttpDocurackRepository },
    { provide: LtcRepository, useClass: HttpLtcRepository }
    
  ]
};
