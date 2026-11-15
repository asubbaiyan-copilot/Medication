import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Drug {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './drugs.html',
  styleUrls: ['./drugs.css']
})
export class DrugsComponent {
  drugs = signal<Drug[]>([
    { id: 1, name: 'Aspirin', dosage: '500mg', frequency: 'Twice daily' },
    { id: 2, name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily' },
    { id: 3, name: 'Amoxicillin', dosage: '250mg', frequency: 'Twice daily' }
  ]);

  newDrugName = signal('');
  newDrugDosage = signal('');
  newDrugFrequency = signal('');

  addDrug() {
    if (this.newDrugName() && this.newDrugDosage() && this.newDrugFrequency()) {
      const newId = Math.max(...this.drugs().map(d => d.id), 0) + 1;
      const newDrug: Drug = {
        id: newId,
        name: this.newDrugName(),
        dosage: this.newDrugDosage(),
        frequency: this.newDrugFrequency()
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
  }
}
