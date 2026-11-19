import { DocutrackInstance } from "../domain/docutrackInstance"; 
   
export abstract class DocutrackRepository {
  abstract loadAll(): Promise<readonly DocutrackInstance[]>;
}
