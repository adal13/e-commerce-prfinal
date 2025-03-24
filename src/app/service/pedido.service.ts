import { Injectable } from '@angular/core';
import { Cliente } from './cliente.service';
import { Producto } from './producto.service';

export enum EstadoPedido {
  PENDIENTE = 'Pendiente',
  ENVIADO = 'Enviado',
  ENTREGADO = 'Entregado',
  CANCELADO = 'Cancelado'
}

export interface Pedido {
  id: number;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  fechaCreacion: Date;
  estado: EstadoPedido;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // constructor() { }

  private pedidos: Pedido[] = [];

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  agregarPedido(pedido: Pedido): void {
    pedido.id = this.pedidos.length + 1;
    pedido.total = this.calcularTotal(pedido.productos);
    pedido.fechaCreacion = new Date();
    this.pedidos.push(pedido);
  }

  editarPedido(index: number, pedido: Pedido): void {
    pedido.total = this.calcularTotal(pedido.productos);
    this.pedidos[index] = { ...pedido, id: this.pedidos[index].id };
  }

  eliminarPedido(index: number): void {
    this.pedidos.splice(index, 1);
  }

  private calcularTotal(productos: Producto[]): number {
    return productos.reduce((acc, prod) => acc + prod.precio, 0);
  }
}
