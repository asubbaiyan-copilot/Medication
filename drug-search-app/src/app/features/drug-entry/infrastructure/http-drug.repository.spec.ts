import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { appConfig } from '../../../app.config';
import { APP_CONFIG } from '../../../app-config.token';
import { DrugRepository } from '../application/ports/drug-repository';
import { HttpDrugRepository } from './http-drug.repository';

describe('HttpDrugRepository', () => {
  it('loads drugs from the configured API endpoint', async () => {
    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: { apiBaseUrl: 'https://api.example.test' } },
      ],
    });

    const repository = TestBed.inject(DrugRepository);
    expect(repository).toBeInstanceOf(HttpDrugRepository);
    const response = repository.loadAll();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne('https://api.example.test/drugs/druglist').flush([]);

    await expect(response).resolves.toEqual([]);
    http.verify();
  });
});
