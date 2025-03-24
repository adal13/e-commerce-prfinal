import { Injectable } from '@angular/core';
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private productos: Producto[] = [
    { id: 1, nombre: 'Laptop', descripcion: 'Laptop de última generación', precio: 1200, stock: 10 },
    { id: 2, nombre: 'Mouse', descripcion: 'Mouse inalámbrico', precio: 25, stock: 50 }
  ];

  // constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }

  agregarProducto(producto: Producto): void {
    producto.id = this.productos.length + 1;
    this.productos.push(producto);
  }

  editarProducto(index: number, producto: Producto): void {
    this.productos[index] = { ...producto, id: this.productos[index].id };
  }

  eliminarProducto(index: number): void {
    this.productos.splice(index, 1);
  }
}
