import { Component, inject } from '@angular/core';
import { DrugCardComponent } from './components/drug-card/drug-card';
import { Drug, DrugService } from './services/drug.service';

@Component({
  imports: [DrugCardComponent],
  providers: [DrugService],
  selector: 'app-drug-entry',
  styleUrls: ['./drug-entry.css'],
  templateUrl: './drug-entry.html',
})
export class DrugEntryComponent {
  private readonly drugService = inject(DrugService);
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
