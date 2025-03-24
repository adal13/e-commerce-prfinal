import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClienteComponent,
    PedidoComponent,
    ProductoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
