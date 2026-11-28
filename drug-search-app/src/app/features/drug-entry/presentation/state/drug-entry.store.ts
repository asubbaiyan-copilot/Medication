import { Injectable, inject, signal } from '@angular/core';
import type { Drug } from '../../domain/drug';
import { increasePrice } from '../../domain/drug-rules';
import { DrugRepository } from '../../application/ports/drug-repository';

@Injectable({ providedIn: 'root' })
export class DrugEntryStore {
  private readonly repository = inject(DrugRepository);

  readonly drugs = signal<readonly Drug[]>([]);
  readonly loadError = signal<string | null>(null);

  constructor() {
    this.loadDrug();
  }

  loadDrug(): void {
    this.loadError.set(null);
    void this.repository.loadAll().then(
      drugs => this.drugs.set(drugs),
      error => {
        this.loadError.set('Unable to load drugs. Please try again.');
        console.error('Failed to load drugs', error);
      },
    );
  }

  addDrug(): void {
    this.drugs.update(drugs => [
      ...drugs,
      { id: '12', name: 'New Drug', dose: 100, price: 5, quantity: 0 },
    ]);
  }

  updateDrug(index: number, drug: Drug): void {
    this.drugs.update(drugs => drugs.map((current, i) => i === index ? drug : current));
  }

  updateQuantity(index: number, quantity: number): void {
    this.drugs.update(drugs => drugs.map((drug, i) => i === index ? { ...drug, quantity } : drug));
  }

  updatePrice(index: number, price: number): void {
    this.drugs.update(drugs => drugs.map((drug, i) => i === index ? { ...drug, price } : drug));
  }

  raisePrices(): void {
    this.drugs.update(drugs =>
      drugs.map(drug => ({ ...drug, price: increasePrice(drug.price) })),
    );
  }

  removeDrug(): void {
    this.drugs.update(drugs => drugs.slice(0, -1));
  }
}
