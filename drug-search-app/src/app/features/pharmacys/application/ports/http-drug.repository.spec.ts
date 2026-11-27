import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '../../../../app-config.token';
import { PharmacyDrugRepository } from '../../services/drug-repository';
import { HttpPharmacyDrugRepository } from './http-drug.repository';

describe('HttpPharmacyDrugRepository', () => {
  it('loads drugs from /drugs', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'http://localhost:3000' } },
        { provide: PharmacyDrugRepository, useClass: HttpPharmacyDrugRepository },
      ],
    });

    const response = TestBed.inject(PharmacyDrugRepository).loadAll();
    const http = TestBed.inject(HttpTestingController);

    http.expectOne('http://localhost:3000/drugs').flush([]);

    await expect(response).resolves.toEqual([]);
    http.verify();
  });
});
