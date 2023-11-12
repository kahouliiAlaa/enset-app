import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private host : string="http://localhost:8089";

  constructor(private http:HttpClient) { }

  public searchProducts(keyword:string="",page:number=1, size:number=4){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe : 'response'});
  }

  public checkProduct(product:Product) : Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked:!product.checked});
  }

  public deleteProduct(product: Product){
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  public saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${this.host}/products/`,
      product);
  }
  //Recherche a partir de la partie backend selon le champ name
  //en utilisant json-server on ecrit ?"le champ"_like=...
  //sinon on peut effectuer recherche partie front

  /*public searchProduct(keyword:string):Observable<Product[]>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }*/
  public getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);
  }

  public updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }
}
