import { Pharmacy } from "../domain/pharmacy";

export abstract class PharmacyRepository {
  abstract loadAll(): Promise<readonly Pharmacy[]>;
}