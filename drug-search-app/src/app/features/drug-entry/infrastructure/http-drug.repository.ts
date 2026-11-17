import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { APP_CONFIG } from '../../../app-config.token';
import type { Drug } from '../domain/drug';
import { DrugRepository } from '../application/ports/drug-repository';

@Injectable({ providedIn: 'root' })
export class HttpDrugRepository extends DrugRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly apiUrl = `${this.config.apiBaseUrl}/drugs/druglist`;

  loadAll(): Promise<readonly Drug[]> {
    return firstValueFrom(this.http.get<readonly Drug[]>(this.apiUrl));
  }
}
