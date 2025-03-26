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

  // getClientes(): Cliente[] {
  //   return this.clientes2;
  // }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  
  agregarCliente(cliente: Cliente) {
    cliente.id = this.clientes2.length + 1;
    this.clientes2.push(cliente);
  }

  editarCliente(index: number, cliente: Cliente) {
    this.clientes2[index] = cliente;
  }

  eliminarCliente(index: number) {
    this.clientes2.splice(index, 1);
  }
}
