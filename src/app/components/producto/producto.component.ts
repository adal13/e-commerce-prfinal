import { Component } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { Producto } from 'src/app/models/producto.models';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone:false,
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {

  productos: Producto[] = [];
  productoForm: FormGroup;
  editIndex: number | null = null;
  showForm: boolean = false;

  constructor(private productoService: ProductoService, private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      id :[null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }
/*
  ngOnInit(): void {
   // this.productos = this.productoService.getProductos();
   this.loadProductos();
  }
*/
ngOnInit(): void {
  this.productoService.getProductos().subscribe((productos) => {
    this.productos = productos;
  });
}

  loadProductos(): void { // ME ENLISTA LOS PRODUCTOS QUE ESTAN EN LA BASE DE DATOS Y LOS MUESTRA EN PRIMERA VISTA
    this.productoService.getProductos().subscribe({
      next: productosBack => {
        this.productos = productosBack;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  crearproductos(): void {
    const productosDatos: Producto = this.productoForm.value;
    if (productosDatos.id === null) {
      this.productoService.agregarProducto(productosDatos).subscribe({
        next: (newProducto) => {
          this.productos.push(newProducto);
        }
      })
    } else {
      this.productoService.updateProducto(productosDatos).subscribe({
        next: (updateProducto) => {
          const index = this.productos.findIndex(productos => productos.id === productosDatos.id);
          if (index !== -1) {
            this.productos[index
              
            ] = updateProducto;
          }
        }
      })
    }
    this.showForm = false;
    this.productoForm.reset();
  }


 editarProducto(producto: Producto): void{
  this.showForm = true;
  this.productoForm.patchValue({
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock
  })
}

eliminarProductos(Id: number): void {

  if(confirm('¿Seguro? , ¿Seguro? ¿Quieres eliminar Pana?, no hay vuelta atras!')){
    this.productoService.eliminarProducto(Id).subscribe({
      next: (eliminarProducto) => {
        this.productos = this.productos.filter(productos => productos.id !== Id);
      }
    })
  }
  

}

}