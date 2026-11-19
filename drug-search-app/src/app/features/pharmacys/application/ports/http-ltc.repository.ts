import { LtcRepository } from "../../services/ltc-repository";
import { LtcInstance } from "../../domain/LtcInstance";
import { APP_CONFIG } from "../../../../app-config.token";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpLtcRepository extends LtcRepository {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly apiUrl = `${this.config.apiBaseUrl}/ltc`;

  loadAll(): Promise<readonly LtcInstance[]> {
    return firstValueFrom(this.http.get<readonly LtcInstance[]>(this.apiUrl));
  }
}