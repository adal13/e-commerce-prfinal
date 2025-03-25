import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.models';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //constructor() { }

  private clientes: Cliente[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@example.com', telefono: '1234567890', direccion: 'Calle 123' },
    { id: 2, nombre: 'María', apellido: 'Gómez', email: 'maria@example.com', telefono: '0987654321', direccion: 'Av. Principal' },
  ];

  getClientes(): Cliente[] {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    cliente.id = this.clientes.length + 1;
    this.clientes.push(cliente);
  }

  editarCliente(index: number, cliente: Cliente) {
    this.clientes[index] = cliente;
  }

  eliminarCliente(index: number) {
    this.clientes.splice(index, 1);
  }
}
