import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Producto } from '../models/producto.models';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.models';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private apiUrl ="http://localhost:8090/api/productos";
  


   constructor(private http: HttpClient) { }

 //getProductos(): Producto[] {
   // return this.http.get<Producto[]>(this.apiUrl);
  //}
  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
  agregarProducto(producto: Producto): Observable<Producto>{
    //producto.id = this.productos.length + 1;
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(this.apiUrl + '/' + producto.id,producto);
  }

  eliminarProducto(id: number): Observable <Producto> {
    return this.http.delete<Producto>(this.apiUrl + '/' + id);
  }



}
