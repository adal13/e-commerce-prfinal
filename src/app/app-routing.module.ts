import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [


  { path: 'inicio', component: InicioComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'productos', component: ProductoComponent },
  { path: '**', redirectTo: 'inicio' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
