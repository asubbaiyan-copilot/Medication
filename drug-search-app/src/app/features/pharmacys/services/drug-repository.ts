import { Drug } from '../domain/drug';

export abstract class PharmacyDrugRepository {
  abstract loadAll(): Promise<readonly Drug[]>;
}
