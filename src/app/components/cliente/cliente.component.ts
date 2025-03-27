import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.models';
import { EstadoPedido } from 'src/app/models/enum.models';
import { Producto } from 'src/app/models/producto.models';
import { ClienteService } from 'src/app/service/cliente.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';

declare const bootstrap: any; // 👈 Declaración para TypeScript
@Component({
  selector: 'app-clientes',
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
      id: [null],
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
    //this.productos = this.productoService.getProductos();
    this.loadClientes();
  }

  guardarCliente(): void {
    const clienteDatos: Cliente = this.clienteForm.value;
    if (clienteDatos.id === null) {

        this.clienteService.agregarCliente(clienteDatos).subscribe({
          next: (newCliente) => {
            this.clientes.push(newCliente);
          }
        })
    } else {

       this.clienteService.editarCliente(clienteDatos).subscribe({
          next: (updatedCliente) => {
            const index = this.clientes.findIndex(cliente => cliente.id === clienteDatos.id);
            if (index !== -1) {
              this.clientes[index] = updatedCliente;
            }
          }
        }) 
  }
  this.clienteForm.reset();
  (document.getElementById('cerrarModal') as HTMLButtonElement).click();
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
      this.pedidoService.crearPedido(pedidoData);
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

  eliminarCliente(clienteId: number): void {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.clienteService.eliminarCliente(clienteId).subscribe({
        next: (deletedCliente) => {
          this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
        }
      })
    }
  }

loadClientes(): void {
  this.clienteService.getClientes().subscribe({
    next: clientesBack => {
      this.clientes = clientesBack;
    },
    error: error => {
      console.log(error);
    }
  })
}
}
