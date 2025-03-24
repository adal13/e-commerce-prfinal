import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoPedido } from 'src/app/models/enum.models';
import { Pedido } from 'src/app/models/pedido.models';
import { Cliente, ClienteService } from 'src/app/service/cliente.service';
import { PedidoService } from 'src/app/service/pedido.service';
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
  pedidosFiltrados: Pedido[] = [];
  emailSeleccionado: string = '';
  //estados = Object.values(EstadoPedido);
  // Filtramos estados para que 'Cancelado' no aparezca en el formulario
  estados = Object.values(EstadoPedido).filter(e => e !== EstadoPedido.CANCELADO);

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

  cargarPedidos() {
    this.pedidos = this.pedidoService.getPedidos();
  }

  // actualizarEstado(index: number, nuevoEstado: EstadoPedido) {
  //   if (this.pedidos[index].estado !== EstadoPedido.ENTREGADO) {
  //     this.pedidos[index].estado = nuevoEstado;
  //     this.pedidoService.editarPedido(index, this.pedidos[index]);
  //     this.cargarPedidos();
  //   }
  // }

  actualizarEstado(index: number, nuevoEstado: EstadoPedido) {
    if (this.pedidos[index].estado !== EstadoPedido.ENTREGADO) {
      this.pedidos[index].estado = nuevoEstado;
      this.pedidoService.editarPedido(index, this.pedidos[index]);
      this.pedidos = this.pedidoService.getPedidos();
    }
  }

  guardarPedido() {
    if (this.pedidoForm.valid) {
      const pedidoData: Pedido = {
        id: 0,
        cliente: this.pedidoForm.value.cliente,
        productos: this.pedidoForm.value.productos,
        total: this.calcularTotal(this.pedidoForm.value.productos),
        // total: 0, // Se calculará automáticamente
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

  calcularTotal(productos: Producto[]): number {
    return productos.reduce((total, producto) => total + producto.precio, 0);
  }

  editarPedido(index: number) {
    this.editIndex = index;
    const pedido = this.pedidos[index];
    this.pedidoForm.patchValue(pedido);
  }

  eliminarPedido(index: number) {
    if (confirm('¿Seguro que deseas eliminar este pedido?')) {
      this.pedidoService.eliminarPedido(index);
      this.cargarPedidos();
      //this.pedidos = this.pedidoService.getPedidos();
    }
  }

  filtrarPedidos() {
    if (this.emailSeleccionado) {
      this.pedidosFiltrados = this.pedidoService.getPedidosPorCorreo(this.emailSeleccionado);
    } else {
      this.pedidosFiltrados = this.pedidoService.getPedidos(); // Mostrar todos si no hay filtro
    }
  }

  obtenerClaseEstado(estado: EstadoPedido): string {
    return {
      [EstadoPedido.PENDIENTE]: 'table-primary',
      [EstadoPedido.ENVIADO]: 'table-warning',
      [EstadoPedido.ENTREGADO]: 'table-success',
      [EstadoPedido.CANCELADO]: 'table-danger',
    }[estado] || '';
  }
}
