import { Brand } from "../brand/brand";
import { Category } from "../category/category";


export interface Product {
 
    productid: number,
    productname: string,
    price: number,
    stock: number,
    estado: boolean,
    talla: string,
    categories: Category,
    brands: Brand

}

export interface ProductListDTO {
  productid: number;
  productname: string;
  price: number;
  stock: number;
  estado: boolean;
  talla: string;
  categoryname: string;
  marcanombre: string;
}

export interface ProductDTO {
    productid: number;
    productname: string;
    price: number;
    stock: number;
    estado: boolean;
    talla: string;
    categoryid: number;
    brandid: number;
}