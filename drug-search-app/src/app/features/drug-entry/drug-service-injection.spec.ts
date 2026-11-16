import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { appConfig } from '../../app.config';
import { DrugCardComponent } from './components/drug-card/drug-card';
import { DrugEntryComponent } from './drug-entry';
import { DRUG_SERVICE, IDrugService } from './services/IDrugService';
import { DrugService } from './services/drug.service';

describe('drug service injection', () => {
  it('uses the configured HTTP service by default', () => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers, provideHttpClientTesting()],
    });

    expect(TestBed.inject(DRUG_SERVICE)).toBeInstanceOf(DrugService);
    const http = TestBed.inject(HttpTestingController);
    http.expectOne(request => request.url.endsWith('/drugs/druglist')).flush([]);
    http.verify();
  });

  it('uses a replacement service in the entry and its cards', () => {
    let additions = 0;
    const mock: IDrugService = {
      getDrugList: () => [{ name: 'Mock drug', dose: 1, price: 2, quantity: 3 }],
      loadDrug: () => {},
      addDrug: () => { additions++; },
      updateDrug: () => {},
      updateQuantity: () => {},
      updatePrice: () => {},
      raisePrices: () => {},
      removeDrug: () => {},
      sell: () => null,
      purchase: (quantity, purchased) => quantity + purchased,
      isInStock: () => false,
      increasePrice: price => price + 1,
      totalPrice: (price, quantity) => price * quantity,
    };
    TestBed.configureTestingModule({
      imports: [DrugEntryComponent],
      providers: [{ provide: DRUG_SERVICE, useValue: mock }],
    });

    const fixture = TestBed.createComponent(DrugEntryComponent);
    fixture.detectChanges();
    fixture.componentInstance.addDrug();
    const card = fixture.debugElement.query(By.directive(DrugCardComponent)).componentInstance as DrugCardComponent;
    expect(additions).toBe(1);
    expect(fixture.componentInstance.getDrugList()[0].name).toBe('Mock drug');
    expect(card.inStock).toBe(false);
  });
});
