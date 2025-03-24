import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoPedido } from 'src/app/models/enum.models';
import { Cliente, ClienteService } from 'src/app/service/cliente.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { Producto, ProductoService } from 'src/app/service/producto.service';

declare const bootstrap: any; // 👈 Declaración para TypeScript
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  //constructor() { }

  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  editIndex: number | null = null;
  pedidoForm: FormGroup;  // Agregamos el formulario de pedidos
  productos: Producto[] = [];
  estados = Object.values(EstadoPedido);

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productoService: ProductoService,
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', [Validators.maxLength(100)]]
    });

    this.pedidoForm = this.fb.group({
      cliente: [null, Validators.required],
      productos: [[], Validators.required],
      estado: [EstadoPedido.PENDIENTE, Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    this.productos = this.productoService.getProductos();
  }



  guardarCliente() {
    if (this.clienteForm.valid) {
      const clienteData: Cliente = { id: 0, ...this.clienteForm.value };

      if (this.editIndex !== null) {
        this.clienteService.editarCliente(this.editIndex, clienteData);
        this.editIndex = null;
      } else {
        this.clienteService.agregarCliente(clienteData);
      }

      this.clienteForm.reset();
      (document.getElementById('cerrarModal') as HTMLButtonElement).click();
      this.clientes = this.clienteService.getClientes();
    }
  }
  @ViewChild('pedidoModal') pedidoModal: any;
  nuevoPedido(cliente: Cliente) {
    this.editIndex = null;
    this.pedidoForm.reset({
      cliente: cliente, // Preseleccionar el cliente
      productos: [],
      estado: EstadoPedido.PENDIENTE
    });

    // Abrimos el modal
    //const modal = new bootstrap.Modal(document.getElementById('pedidoModal')!);
    const modal = new bootstrap.Modal(this.pedidoModal.nativeElement);
    modal.show();
  }


  guardarPedido() {
    if (this.pedidoForm.valid) {
      const pedidoData = this.pedidoForm.value;
      this.pedidoService.agregarPedido(pedidoData);
      this.pedidoForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('pedidoModal')!);
      modal.hide();
    }
  }

  editarCliente(index: number) {
    this.editIndex = index;
    const cliente = this.clientes[index];
    this.clienteForm.patchValue(cliente);
  }

  eliminarCliente(index: number) {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clienteService.eliminarCliente(index);
      this.clientes = this.clienteService.getClientes();
    }
  }


}
