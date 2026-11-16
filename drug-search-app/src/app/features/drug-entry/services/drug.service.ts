import { Injectable, signal } from '@angular/core';

export interface Drug {
  readonly name: string;
  readonly dose: number;
  readonly price: number;
  readonly quantity: number;
}

@Injectable({ providedIn: 'root' })
export class DrugService {
  private readonly drugList = signal<readonly Drug[]>([
    { name: 'Aspirin', dose: 500, price: 10, quantity: 0 },
    { name: 'Ibuprofen', dose: 200, price: 15, quantity: 0 },
    { name: 'Paracetamol', dose: 500, price: 8, quantity: 0 },
  ]);
  readonly drugs = this.drugList.asReadonly();

  addDrug(): void {
    this.drugList.update(drugs => [
      ...drugs,
      { name: 'New Drug', dose: 100, price: 5, quantity: 0 },
    ]);
  }

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
