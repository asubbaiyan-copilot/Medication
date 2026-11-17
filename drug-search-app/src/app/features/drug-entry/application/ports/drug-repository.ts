import type { Drug } from '../../domain/drug';

export abstract class DrugRepository {
  abstract loadAll(): Promise<readonly Drug[]>;
}
