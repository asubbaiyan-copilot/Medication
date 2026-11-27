import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APP_CONFIG } from '../../../../app-config.token';
import { Drug } from '../../domain/drug';
import { PharmacyDrugRepository } from '../../services/drug-repository';

@Injectable({ providedIn: 'root' })
export class HttpPharmacyDrugRepository extends PharmacyDrugRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly apiUrl = `${this.config.apiBaseUrl}/drugs`;

  loadAll(): Promise<readonly Drug[]> {
    return firstValueFrom(this.http.get<readonly Drug[]>(this.apiUrl));
  }
}
