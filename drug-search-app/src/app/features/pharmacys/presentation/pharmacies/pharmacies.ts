import { Component, computed, inject, Input, input, signal } from '@angular/core';
import { PharmacyServices } from '../../services/pharmacy-services';
import { Pharmacy } from '../../domain/pharmacy';
import { LtcInstance } from '../../domain/LtcInstance';
import { DocutrackInstance } from '../../domain/docutrackInstance';
import { InOutChildSample } from './in-out-child-sample/in-out-child-sample';

export interface PharmacyRow {
  readonly pharmacy: Pharmacy;
  readonly docutrack: DocutrackInstance | null;
  readonly ltc: LtcInstance | null;
}

@Component({
  imports: [InOutChildSample],
  selector: 'app-pharmacies',
  styleUrls: ['./pharmacies.css'],
  templateUrl: './pharmacies.html',
})
export class Pharmacies {

  readonly caption = 'Pharmacy Management';
  private readonly pharmacyServices = inject(PharmacyServices);

  readonly expandedIds = signal<ReadonlySet<string>>(new Set());

  readonly rows = computed<readonly PharmacyRow[]>(() => {
    const docutrackById = new Map(this.pharmacyServices.docutrackInstancesList().map((i) => [i.id, i]));
    const ltcById = new Map(this.pharmacyServices.ltcInstances().map((i) => [i.id, i]));

    return this.pharmacyServices.pharmacies().map((pharmacy) => ({
      pharmacy,
      docutrack: pharmacy.docutrackInstanceId ? docutrackById.get(pharmacy.docutrackInstanceId) ?? null : null,
      ltc: pharmacy.ltcInstanceId ? ltcById.get(pharmacy.ltcInstanceId) ?? null : null,
    }));
  });

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  toggle(id: string): void {
    this.expandedIds.update((ids) => {
      const next = new Set(ids);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }
}
