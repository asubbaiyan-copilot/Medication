import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../../app-config.token';
import type { Drug } from '../models/drug';
import type { IDrugService } from './IDrugService';


@Injectable({ providedIn: 'root' })
export class DrugService implements IDrugService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  private readonly apiUrl = `${this.config.apiBaseUrl}/drugs/druglist`;
  private readonly drugList = signal<readonly Drug[]>([]);

  // private readonly drugList = signal<readonly Drug[]>([
  //   { name: 'Aspirin', dose: 500, price: 10, quantity: 0 },
  //   { name: 'Ibuprofen', dose: 200, price: 15, quantity: 0 },
  //   { name: 'Paracetamol', dose: 500, price: 8, quantity: 0 },
  // ]);
  getDrugList(): readonly Drug[] {
    return this.drugList();
  }
  constructor() {
    this.loadDrug();
  }
  loadDrug(): void {
    this.http.get<readonly Drug[]>(this.apiUrl).subscribe({
      next: (drugs) => this.drugList.set(drugs),
      error: (error)=>{
        console.error('Failed to load drugs', error);
      },
      complete: () => { 
        console.log('Drug loading complete {drugList: ', this.drugList()); 
      }
    });    
  }
  addDrug(): void {
    this.drugList.update(drugs => [
      ...drugs,
      { name: 'New Drug', dose: 100, price: 5, quantity: 0 },
    ]);
  }
  /// Updates the drug at the specified index with the provided drug object.
  /// @param index The index of the drug to update.
  /// @param drug The new drug object to replace the existing one.
  updateDrug(index: number, drug: Drug): void {
    this.drugList.update(drugs => drugs.map((current, i) => i === index ? drug : current));
  }

  updateQuantity(index: number, quantity: number): void {
    this.drugList.update(drugs => drugs.map((drug, i) => i === index ? { ...drug, quantity } : drug));
  }

  updatePrice(index: number, price: number): void {
    this.drugList.update(drugs => drugs.map((drug, i) => i === index ? { ...drug, price } : drug));
  }

  raisePrices(): void {
    this.drugList.update(drugs =>
      drugs.map(drug => ({ ...drug, price: this.increasePrice(drug.price) })),
    );
  }

  removeDrug(): void {
    this.drugList.update(drugs => drugs.slice(0, -1));
  }

  sell(quantity: number, quantitySold: number): number | null {
    return quantity < quantitySold ? null : quantity - quantitySold;
  }

  purchase(quantity: number, quantityPurchased: number): number {
    return quantity + quantityPurchased;
  }

  isInStock(quantity: number): boolean {
    return quantity > 0;
  }

  increasePrice(price: number): number {
    return price + 1;
  }

  totalPrice(price: number, quantity: number): number {
    return price * quantity;
  }
}
