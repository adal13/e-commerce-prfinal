import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteService } from 'src/app/service/cliente.service';
import { EstadoPedido, Pedido, PedidoService } from 'src/app/service/pedido.service';
import { Producto, ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  pedidoForm: FormGroup;
  editIndex: number | null = null;
  estados = Object.values(EstadoPedido);

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {
    this.pedidoForm = this.fb.group({
      cliente: [null, Validators.required],
      productos: [[], Validators.required],
      estado: [EstadoPedido.PENDIENTE, Validators.required],
    });
  }

  ngOnInit(): void {
    this.pedidos = this.pedidoService.getPedidos();
    this.clientes = this.clienteService.getClientes();
    this.productos = this.productoService.getProductos();
  }

  guardarPedido() {
    if (this.pedidoForm.valid) {
      const pedidoData: Pedido = {
        id: 0,
        cliente: this.pedidoForm.value.cliente,
        productos: this.pedidoForm.value.productos,
        total: 0, // Se calculará automáticamente
        fechaCreacion: new Date(),
        estado: this.pedidoForm.value.estado,
      };

      if (this.editIndex !== null) {
        this.pedidoService.editarPedido(this.editIndex, pedidoData);
        this.editIndex = null;
      } else {
        this.pedidoService.agregarPedido(pedidoData);
      }

      this.pedidoForm.reset({ estado: EstadoPedido.PENDIENTE });
      (document.getElementById('cerrarModal') as HTMLButtonElement).click();
      this.pedidos = this.pedidoService.getPedidos();
    }
  }

  editarPedido(index: number) {
    this.editIndex = index;
    const pedido = this.pedidos[index];
    this.pedidoForm.patchValue(pedido);
  }

  eliminarPedido(index: number) {
    if (confirm('¿Seguro que deseas eliminar este pedido?')) {
      this.pedidoService.eliminarPedido(index);
      this.pedidos = this.pedidoService.getPedidos();
    }
  }

}
