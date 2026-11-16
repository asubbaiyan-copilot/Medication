import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DrugCardComponent } from '../drug-card/drug-card';

@Component({
  imports: [DrugCardComponent],
  selector: 'app-drug-entry',
  styleUrls: ['./drug-entry.css'],
  templateUrl: './drug-entry.html',
})
export class DrugEntry implements OnInit {
  title:any;
  drugs: any[] = [];
  constructor() {}
  ngOnInit(): void {
    // No initialization is needed until drug-entry data is available.
    this.title = 'Drug Entry';
    this.drugs = [
      { name: 'Aspirin', dose: 500, price: 10, inStock: true },
      { name: 'Ibuprofen', dose: 200, price: 15, inStock: false },
      { name: 'Paracetamol', dose: 500, price: 8, inStock: true }
    ];
  }
  addDrug() {
    this.drugs.push({ name: 'New Drug', dose: 100, price: 5, inStock: true });
  }
  updateDrug(index: number, updatedDrug: any) {
    if (index >= 0 && index < this.drugs.length) {
      this.drugs[index] = updatedDrug;
    }
  }

  raisePrice() {
    this.drugs.forEach(drug => {
      drug.price += 1;
    });
  }
  removeDrug() {
    this.drugs.pop();
  }
}
