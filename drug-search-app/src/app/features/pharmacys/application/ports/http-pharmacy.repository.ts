 
import { APP_CONFIG } from "../../../../app-config.token";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from 'rxjs';
import { PharmacyRepository } from "../../services/pharmacy-repository"; 
import { Pharmacy } from "../../domain/pharmacy";

@Injectable({ providedIn: 'root' })
export class HttpPharmacyRepository extends PharmacyRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly apiUrl = `${this.config.apiBaseUrl}/pharmacies`;

    loadAll(): Promise<readonly Pharmacy[]> {
        return firstValueFrom(this.http.get<readonly Pharmacy []>(this.apiUrl));
    }
}