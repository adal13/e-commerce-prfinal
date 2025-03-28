import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.models';
import { Producto } from '../models/producto.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
   
  private apiUrl = environment.apiUrl+"clientes/"; 
  private apiUrlProductos = environment.apiUrl+"productos/";

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  public getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrlProductos);
  }
  
  public agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  
  public editarCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.apiUrl + '/' + cliente.id, cliente);
  }

  public eliminarCliente(clienteId: number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.apiUrl + '/' + clienteId);
  }


}
