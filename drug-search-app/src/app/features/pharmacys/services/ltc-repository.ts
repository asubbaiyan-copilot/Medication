import { LtcInstance } from "../domain/LtcInstance";

export abstract class LtcRepository {
  abstract loadAll(): Promise<readonly LtcInstance[]>;
}