import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl: string = 'http://localhost:8090/api/clientes'; 

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
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
