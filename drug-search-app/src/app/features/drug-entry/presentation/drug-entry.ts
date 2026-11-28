import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  private readonly routeId = this.route.snapshot.paramMap.get('id');
  private readonly id = this.routeId === null ? null : String(this.routeId).trim();
  readonly hasRouteId = this.id !== null && this.id !== '';
  readonly showAllRecords = signal(!this.hasRouteId);

  constructor() {
    const message = this.hasRouteId ? `Drug ID: ${this.id}` : 'No drug ID found in route';
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  readonly filteredDrugs = computed(() => {
    const drugs = this.drugs();
    if (this.showAllRecords() || !this.hasRouteId) return drugs;
    return drugs.filter(drug => drug.id === this.id);
  });

  showAll(): void {
    this.showAllRecords.set(true);
  }

  showFiltered(): void {
    this.showAllRecords.set(false);
  }

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
