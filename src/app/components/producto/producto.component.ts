import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto, ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {

  productos: Producto[] = [];
  productoForm: FormGroup;
  editIndex: number | null = null;

  constructor(private productoService: ProductoService, private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
   // this.productos = this.productoService.getProductos();
   this.loadProductos();
  }

  guardarProducto() {
    if (this.productoForm.valid) {
      const productoData: Producto = { id: 0, ...this.productoForm.value };

      if (this.editIndex !== null) {
        this.productoService.editarProducto(this.editIndex, productoData);
        this.editIndex = null;
      } else {
        this.productoService.agregarProducto(productoData);
      }

      this.productoForm.reset({ precio: 0, stock: 0 });
      (document.getElementById('cerrarModal') as HTMLButtonElement).click();
      this.productos = this.productoService.getProductos();
    }
  }

  editarProducto(index: number) {
    this.editIndex = index;
    const producto = this.productos[index];
    this.productoForm.patchValue(producto);
  }

  eliminarProducto(index: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(index);
      this.productos = this.productoService.getProductos();
    }
  }

}
