import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DrugRepository } from '../../application/ports/drug-repository';
import { DrugEntryStore } from './drug-entry.store';

describe('DrugEntryStore', () => {
  it('loads drugs and applies list updates', async () => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DrugRepository,
        useValue: {
          loadAll: () => Promise.resolve([
            { name: 'Aspirin', dose: 500, price: 10, quantity: 0 },
          ]),
        },
      }],
    });

    const store = TestBed.inject(DrugEntryStore);
    await Promise.resolve();
    store.updateQuantity(0, 3);
    store.raisePrices();

    expect(store.drugs()).toEqual([
      { name: 'Aspirin', dose: 500, price: 11, quantity: 3 },
    ]);

    store.addDrug();
    expect(store.drugs()).toHaveLength(2);
    store.removeDrug();
    expect(store.drugs()).toHaveLength(1);
  });

  it('exposes a load error when the repository rejects', async () => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DrugRepository,
        useValue: { loadAll: () => Promise.reject(new Error('offline')) },
      }],
    });
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    const store = TestBed.inject(DrugEntryStore);
    await Promise.resolve();

    expect(store.loadError()).toBe('Unable to load drugs. Please try again.');
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
