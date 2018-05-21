/**
 * Created by jose on 22/12/2016.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaClaseComponent } from './lista-clase/lista-clase.component';
import { BoletaComponent } from './boleta/boleta.component';
import { NotasComponent } from './notas/notas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LstCtrlComponent } from './lst-ctrl/lst-ctrl.component';
import { ListaCtrlComponent } from './lst-ctrl/listaCtrl/listaCtrl.component';

import { InfoEstudComponent } from './info-estud/info-estud.component';
import { HorariosComponent } from './horarios/horarios.component';
import { NotasRegistraComponent } from './notas/notas-registra/notas-registra.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'listaClase',
    component: ListaClaseComponent,
    canActivate: [AuthGuard]
  },
  { path: 'boleta', component: BoletaComponent, canActivate: [AuthGuard] },
  { path: 'notas', component: NotasComponent, canActivate: [AuthGuard] },
  {
    path: 'listaControl',
    component: LstCtrlComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listaCtrl/:id',
    component: ListaCtrlComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notasReg/:id',
    component: NotasRegistraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'infoEstud',
    component: InfoEstudComponent,
    canActivate: [AuthGuard]
  },
  { path: 'horarios', component: HorariosComponent, canActivate: [AuthGuard] },

  // { path: '', component: ListaClaseComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '/' }
  { path: '', redirectTo: 'login' , pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
