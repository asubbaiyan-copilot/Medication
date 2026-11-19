import { inject, Injectable, signal } from '@angular/core';
import { PharmacyRepository } from "./pharmacy-repository";
import { DocutrackRepository } from "./docutrack-repository";
 
import { LtcInstance } from "../domain/LtcInstance";
import { Pharmacy } from "../domain/pharmacy";
import { DocutrackInstance } from "../domain/docutrackInstance";
import { LtcRepository } from './ltc-repository';
 
@Injectable({ providedIn: 'root' }) 
export class PharmacyServices {
    private readonly pharmacyRepository: PharmacyRepository = inject(PharmacyRepository);
    private readonly docutrackRepository: DocutrackRepository = inject(DocutrackRepository);
    private readonly ltcRepository: LtcRepository = inject(LtcRepository);
    
    private readonly pharmacys = signal<readonly Pharmacy[]>([]);
    private readonly docutrackInstances = signal<readonly DocutrackInstance[]>([]);
    private readonly ltcs  = signal<readonly LtcInstance[]>([]);

    constructor() {
        this.loadPharmacies();
    }
    
    get pharmacyData() : readonly Pharmacy[] {
        return this.pharmacys();
    }
    
    get docutrackInstancesData() : readonly DocutrackInstance[] {
        return this.docutrackInstances();
    }
    
    get ltcsData() : readonly LtcInstance[] {
        return this.ltcs();
    }


    private loadPharmacies() :void {
        this.pharmacyRepository.loadAll().then((pharmacies) => this.pharmacys.set(pharmacies)).catch((error) => console.error(error));
        this.docutrackRepository.loadAll().then((instances) => this.docutrackInstances.set(instances)).catch((error) => console.error(error));
        this.ltcRepository.loadAll().then((ltcs) => this.ltcs.set(ltcs)).catch((error) => console.error(error));
    }
    

 
}