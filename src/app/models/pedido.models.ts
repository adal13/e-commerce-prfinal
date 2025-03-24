import { Cliente } from "../service/cliente.service";
import { Producto } from "../service/producto.service";
import { EstadoPedido } from "./enum.models";

export interface Pedido {
  id: number;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  fechaCreacion: Date;
  estado: EstadoPedido;
}
