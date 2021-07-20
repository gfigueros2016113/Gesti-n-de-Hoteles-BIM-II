import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'hotel', component: HotelComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'tipoEvento', component: TipoEventoComponent},
  { path: 'evento', component: TipoEventoComponent},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
