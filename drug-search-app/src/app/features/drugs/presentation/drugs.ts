import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Drug } from '../domain/drug';
import { CustomStyle } from '../../drug-entry/presentation/directives/custom-style';
import { InOutChildSample } from '../../pharmacys/presentation/pharmacies/in-out-child-sample/in-out-child-sample';

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, FormsModule, CustomStyle, InOutChildSample],
  standalone: true,
  templateUrl: './drugs.html',
  styleUrls: ['./drugs.css'],
})
export class DrugsComponent {
  caption: string = 'Medication Management';
  childCounter: number = 0;
  counter: number = 0;
  readonly counterError = signal('');
  isRequired :boolean = true;
  readonly captionNewDrugName: string = 'Drug Name';
  readonly captionNewDrugDosage: string = 'Dosage';
  readonly captionNewDrugFrequency: string = 'Frequency';
  readonly captionNewDrugShape: string = 'Shape';
  
  drugTotalCount = computed(() => this.drugs().length);
  isEntryValid = computed(() =>
    [
      this.newDrugName(),
      this.newDrugDosage(),
      this.newDrugFrequency(),
      this.newDrugShape(),
    ].every(value => value.trim().length > 0),
  );

  drugs = signal<Drug[]>([]);

  newDrugName = signal('');
  newDrugDosage = signal('');
  newDrugFrequency = signal('');
  newDrugShape = signal('');
  get(val: number) {
      this.childCounter = val;
   } 
  addDrug(): void {
    if (!this.isEntryValid()) return;

    const newId = Math.max(...this.drugs().map(drug => drug.id), 0) + 1;
    const newDrug: Drug = {
      id: newId,
      name: this.newDrugName().trim(),
      dosage: this.newDrugDosage().trim(),
      frequency: this.newDrugFrequency().trim(),
      shape: this.newDrugShape().trim(),
    };
    this.drugs.set([...this.drugs(), newDrug]);
    this.clearForm();
  }

  removeDrug(id: number): void {
    this.drugs.set(this.drugs().filter(drug => drug.id !== id));
  }

  clearForm(): void {
    this.newDrugName.set('');
    this.newDrugDosage.set('');
    this.newDrugFrequency.set('');
    this.newDrugShape.set('');
  }
  incrementCounter(): void {
       if (this.counter > 9) {
      this.counterError.set('The counter cannot go above 10.');
      return;
    }
    this.counter++;
    this.counterError.set('');
  }

  decrementCounter(): void {
    if (this.counter === 0) {
      this.counterError.set('The counter cannot go below zero.');
      return;
    }

    this.counter--;
    this.counterError.set('');
  }
}
