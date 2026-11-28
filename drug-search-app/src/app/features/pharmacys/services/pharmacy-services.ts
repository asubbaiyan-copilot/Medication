import { inject, Injectable, signal } from '@angular/core';
import { PharmacyRepository } from "./pharmacy-repository";
import { DocutrackRepository } from "./docutrack-repository";
 
import { LtcInstance } from "../domain/LtcInstance";
import { Pharmacy } from "../domain/pharmacy";
import { DocutrackInstance } from "../domain/docutrackInstance";
import { LtcRepository } from './ltc-repository';
import { Drug } from '../domain/drug';
import { PharmacyDrugRepository } from './drug-repository';
 
@Injectable({ providedIn: 'root' }) 
export class PharmacyServices {
    private readonly pharmacyRepository: PharmacyRepository = inject(PharmacyRepository);
    private readonly docutrackRepository: DocutrackRepository = inject(DocutrackRepository);
    private readonly ltcRepository: LtcRepository = inject(LtcRepository);
    private readonly drugRepository: PharmacyDrugRepository = inject(PharmacyDrugRepository);
    
    private readonly pharmacys = signal<readonly Pharmacy[]>([]);
    private readonly docutrackInstances = signal<readonly DocutrackInstance[]>([]);
    private readonly ltcs  = signal<readonly LtcInstance[]>([]);
    private readonly drugList = signal<readonly Drug[]>([]);

    readonly pharmacies = this.pharmacys.asReadonly();
    readonly docutrackInstancesList = this.docutrackInstances.asReadonly();
    readonly ltcInstances = this.ltcs.asReadonly();
    readonly drugs = this.drugList.asReadonly();

    constructor() {
        this.loadPharmacies();
    }


    private loadPharmacies() :void {
        this.pharmacyRepository.loadAll().then((pharmacies) => this.pharmacys.set(pharmacies)).catch((error) => console.error(error));
        this.docutrackRepository.loadAll().then((instances) => this.docutrackInstances.set(instances)).catch((error) => console.error(error));
        this.ltcRepository.loadAll().then((ltcs) => this.ltcs.set(ltcs)).catch((error) => console.error(error));
        this.drugRepository.loadAll().then((drugs) => this.drugList.set(drugs)).catch((error) => console.error(error));
    }
    

 
}