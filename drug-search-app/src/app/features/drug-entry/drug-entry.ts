import { Component, inject } from '@angular/core';
import { DrugCardComponent } from './components/drug-card/drug-card';
import type { Drug } from './models/drug';
import { DRUG_SERVICE } from './services/IDrugService';

@Component({
  imports: [DrugCardComponent],
  selector: 'app-drug-entry',
  styleUrls: ['./drug-entry.css'],
  templateUrl: './drug-entry.html',
})
export class DrugEntryComponent {
  private readonly drugService = inject(DRUG_SERVICE);
  readonly title = 'Drug Entry';
 
  getDrugList(): readonly Drug[] {
    return this.drugService.getDrugList();
  } 
  addDrug() {
    this.drugService.addDrug();
  }

  updateDrug(index: number, updatedDrug: Drug) {
    this.drugService.updateDrug(index, updatedDrug);
  }

  updateQuantity(index: number, quantity: number) {
    this.drugService.updateQuantity(index, quantity);
  }

  updatePrice(index: number, price: number) {
    this.drugService.updatePrice(index, price);
  }

  raisePrice() {
    this.drugService.raisePrices();
  }

  removeDrug() {
    this.drugService.removeDrug();
  }
}
