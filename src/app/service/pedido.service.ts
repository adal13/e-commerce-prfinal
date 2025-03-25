import { environment } from './../environment/environment';
import { Injectable } from '@angular/core';
import { EstadoPedido } from '../models/enum.models';
import { Pedido } from '../models/pedido.models';
import { Producto } from '../models/producto.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl: string = environment.apiCliente;

  constructor(private http: HttpClient) { }

  // Obtiene todos los pedidos activos (no cancelados)
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl).pipe(
      map(pedidos => pedidos.filter(p => p.estado !== EstadoPedido.CANCELADO)),
      catchError(this.handleError)
    );
  }

  // Crea un nuevo pedido
  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido).pipe(
      catchError(this.handleError)
    );
  }

  // Actualiza un pedido existente
  actualizarPedido(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido).pipe(
      catchError(this.handleError)
    );
  }

  // Actualiza solo el estado de un pedido
  actualizarEstadoPedido(id: number, nuevoEstado: EstadoPedido): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado }).pipe(
      catchError(this.handleError)
    );
  }

  // Cancela un pedido (marca como cancelado)
  cancelarPedido(id: number): Observable<void> {
    return this.actualizarEstadoPedido(id, EstadoPedido.CANCELADO).pipe(
      map(() => undefined)
    );
  }

  // Obtiene pedidos por correo electrónico del cliente
  getPedidosPorCorreo(email: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}?cliente.email=${email}`).pipe(
      map(pedidos => pedidos.filter(p => p.estado !== EstadoPedido.CANCELADO)),
      catchError(this.handleError)
    );
  }

  // Manejo centralizado de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en PedidoService:', error);

    let errorMessage = 'Ocurrió un error al procesar la solicitud';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

}
