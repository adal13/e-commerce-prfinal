import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, ClienteService } from 'src/app/service/cliente.service';

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

  constructor(private clienteService: ClienteService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
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
