import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Drug {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  shape: string;
}

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './drugs.html',
  styleUrls: ['./drugs.css']
})
export class DrugsComponent {
  drugTotalCount = computed(() => this.drugs().length);
  
  drugs = signal<Drug[]>([
    { id: 1, name: 'Aspirin', dosage: '500mg', frequency: 'Twice daily', shape: 'Tablet' },
    { id: 2, name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', shape: 'Capsule' },
    { id: 3, name: 'Amoxicillin', dosage: '250mg', frequency: 'Twice daily', shape: 'Capsule' }
  ]);

  newDrugName = signal('');
  newDrugDosage = signal('');
  newDrugFrequency = signal('');
  newDrugShape = signal(''); 

  addDrug() {
    if (this.newDrugName() && this.newDrugDosage() && this.newDrugFrequency() && this.newDrugShape()) {
      const newId = Math.max(...this.drugs().map(d => d.id), 0) + 1;
      const newDrug: Drug = {
        id: newId,
        name: this.newDrugName(),
        dosage: this.newDrugDosage(),
        frequency: this.newDrugFrequency(),
        shape: this.newDrugShape()
      };
      this.drugs.set([...this.drugs(), newDrug]);
      this.clearForm();
    }
  }

  removeDrug(id: number) {
    this.drugs.set(this.drugs().filter(drug => drug.id !== id));
  }

  clearForm() {
    this.newDrugName.set('');
    this.newDrugDosage.set('');
    this.newDrugFrequency.set('');
    this.newDrugShape.set('');
  }
}
