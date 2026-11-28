export interface Pharmacy {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  pharmacyType: string;
  docutrackInstanceId: string | null;
  ltcInstanceId: string | null;
  active: boolean;
}