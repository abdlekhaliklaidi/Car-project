export interface CarCategory {
  id: number;
  name: string;
  nameFr: string;
  description: string;
  displayOrder: number;
}

export interface Car {
  id: number;
  name: string;
  model: string;
  exampleModel: string;
  year: number;
  seats: number;
  doors: number;
  transmission: string;
  fuelType: string;
  isHybrid: boolean;
  hasAirConditioning: boolean;
  imageUrl: string;
  payAtAgencyPrice: number;
  payNowPrice: number;
  savings: number;
  category: CarCategory;
  // whatsappNumber?: string;
}
