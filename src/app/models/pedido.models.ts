import { Cliente } from "./cliente.models";
import { EstadoPedido } from "./enum.models";
import { Producto } from "./producto.models";

export interface Pedido {
  id: number;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  fechaCreacion: Date;
  estado: EstadoPedido;
}
