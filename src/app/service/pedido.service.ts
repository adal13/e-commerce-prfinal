import { Injectable } from '@angular/core';
import { Cliente } from './cliente.service';
import { Producto } from './producto.service';
import { EstadoPedido } from '../models/enum.models';
import { Pedido } from '../models/pedido.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  // constructor() { }

  private pedidos: Pedido[] = [];

  getPedidos(): Pedido[] {
    //return this.pedidos;
    return this.pedidos.filter(p => p.estado !== EstadoPedido.CANCELADO);
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
    // this.pedidos.splice(index, 1);
    this.pedidos[index].estado = EstadoPedido.CANCELADO;

  }

  private calcularTotal(productos: Producto[]): number {
    return productos.reduce((acc, prod) => acc + prod.precio, 0);
  }

  getPedidosPorCorreo(email: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.cliente.email === email);
  }

}
