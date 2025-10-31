export interface ProductCreateRequest {
  productname: string;
  price: number;
  stock: number;
  estado: boolean;
  talla: string;
  imagenUrl: string;
  categoryid: number;
  brandid: number ;
}
