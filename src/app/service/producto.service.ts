import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Producto } from '../models/producto.models';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.models';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private apiUrl = environment.apiUrl+"productos/"; // aqio en vez de configurar el http://localhost
  // se manda a llamar el envriroment que ya tiene el ip apirest que se ocupa y esta configurada
  


   constructor(private http: HttpClient) { }

 //getProductos(): Producto[] {
   // return this.http.get<Producto[]>(this.apiUrl);
  //}
  public getProductos(): Observable<Producto[]> {  // ENDPOINTS QUE TRAE LISTA DE PRODUCTOS
    return this.http.get<Producto[]>(this.apiUrl);
  }
  agregarProducto(producto: Producto): Observable<Producto>{ // ENDPOINT QUE INSERTA O AGREGA UN PRODUCTO
    //producto.id = this.productos.length + 1;
    return this.http.post<Producto>(this.apiUrl+'productos-dto', producto);// se manda a llamar el APIURL ya que esta es
    // esta estipulado en el eviroment
  }

  updateProducto(producto: Producto): Observable<Producto> { // ENDPONT QUE ACTUALIZA EL PRODUCTO
  return this.http.put<Producto>(this.apiUrl + '/' + producto.id,producto);
  }

  eliminarProducto(id: number): Observable <Producto> { //ENDPOINT QUE ELIMINA LOS PRODUCTOS 
    return this.http.delete<Producto>(this.apiUrl + '/' + id);
  }



}
