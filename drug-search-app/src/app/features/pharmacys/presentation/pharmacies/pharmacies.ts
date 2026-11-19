import { Component, inject } from '@angular/core';
import { PharmacyServices } from '../../services/pharmacy-services';
import { Pharmacy } from '../../domain/pharmacy';
import { LtcInstance } from '../../domain/LtcInstance';
import { DocutrackInstance } from '../../domain/docutrackInstance';


@Component({
  imports: [],
  selector: 'app-pharmacies',
  styleUrls:  ['./pharmacies.css'],
  templateUrl: './pharmacies.html',
})
export class Pharmacies {
  private readonly pharmacy = inject(PharmacyServices);
  
  readonly pharmacys:readonly Pharmacy[]  = this.pharmacy.pharmacyData;
  readonly docutrackInstances:readonly DocutrackInstance[] = this.pharmacy.docutrackInstancesData;
  readonly ltcs:readonly LtcInstance[] = this.pharmacy.ltcsData;

    constructor() {
    console.log(this.pharmacys);
    console.log(this.docutrackInstances);
    console.log(this.ltcs);
  }
}
