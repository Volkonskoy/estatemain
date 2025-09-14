export interface Investment {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  priceEUR: number;
  priceUSD: number;
  priceGBP: number;
  fullDescription?: string;
  profitMin: number;
  profitMax: number;
  timeMin: number;
  timeMax: number;
  risk: string;
  imageUrls: string[];
}