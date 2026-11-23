import { DocutrackRepository } from "../../services/docutrack-repository";
import { DocutrackInstance } from "../../domain/docutrackInstance";
import { APP_CONFIG } from "../../../../app-config.token";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpDocurackRepository extends DocutrackRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly apiUrl = `${this.config.apiBaseUrl}/docutrack`;

  loadAll(): Promise<readonly DocutrackInstance[]> {
    return firstValueFrom(this.http.get<readonly DocutrackInstance[]>(this.apiUrl));
  }
}