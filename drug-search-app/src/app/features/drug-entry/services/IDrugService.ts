import type { Drug } from './drug.service';
import { InjectionToken } from '@angular/core';


export interface IDrugService {
  getDrugList(): readonly Drug[];
  loadDrug(): void;
  addDrug(): void;
  updateDrug(index: number, drug: Drug): void;
  updateQuantity(index: number, quantity: number): void;
  updatePrice(index: number, price: number): void;
  raisePrices(): void;
  removeDrug(): void;
  sell(quantity: number, quantitySold: number): number | null;
  purchase(quantity: number, quantityPurchased: number): number;
  isInStock(quantity: number): boolean;
  increasePrice(price: number): number;
  totalPrice(price: number, quantity: number): number;
}
export const DRUG_SERVICE = new InjectionToken<IDrugService>('DRUG_SERVICE');