import { SaleProduct } from "./sale.product.interface";

export interface ShoppingCart {
  id?: string;
  code?: string;
  discount: number;
  typeDiscount: number;
  products: SaleProduct[];
  observation: string;
  client_description?: string;
  vehicle_description?: string;
  people?: any;
  status?: number;
  date_sale?: Date;
  vehicle?: any;
}
