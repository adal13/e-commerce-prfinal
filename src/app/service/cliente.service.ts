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

  private clientes2: Cliente[] = [
    { id: 1, nombre: 'Juan jose', apellido: 'Pérez', email: 'juan@example.com', telefono: '1234567890', direccion: 'Calle 123' },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria@example.com', telefono: '0987654321', direccion: 'Av. Principal' },
  ];

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
