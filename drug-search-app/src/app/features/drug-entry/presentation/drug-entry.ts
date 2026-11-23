import { Component, inject } from '@angular/core';
import { DrugCardComponent } from './components/drug-card/drug-card';
import { DrugEntryStore } from './state/drug-entry.store';
import { InOutChildSample } from '../../pharmacys/presentation/pharmacies/in-out-child-sample/in-out-child-sample';
@Component({
  imports: [DrugCardComponent, InOutChildSample],
  selector: 'app-drug-entry',
  styleUrls: ['./drug-entry.css'],
  templateUrl: './drug-entry.html',
})
export class DrugEntryComponent {
  readonly store = inject(DrugEntryStore);
  readonly drugs = this.store.drugs;
  readonly title = 'Drug Entry';
  readonly caption = 'Drug Management';
  childCounter: number = 0;   

  addDrug(): void {
    this.store.addDrug();
  }

  updateQuantity(index: number, quantity: number): void {
    this.store.updateQuantity(index, quantity);
  }

  updatePrice(index: number, price: number): void {
    this.store.updatePrice(index, price);
  }

  raisePrice(): void {
    this.store.raisePrices();
  }

  removeDrug(): void {
    this.store.removeDrug();
  }
}
