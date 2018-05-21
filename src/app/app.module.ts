import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http'

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ListaClaseComponent } from './lista-clase/lista-clase.component';
import { BoletaComponent } from './boleta/boleta.component';
import { NotasComponent } from './notas/notas.component';
import { LoginComponent } from './login/login.component';
import { CmbClaveComponent } from './login/cmb-clave/cmb-clave.component';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './login/authentication.service';
import { LstCtrlComponent } from './lst-ctrl/lst-ctrl.component';
import { ListaCtrlComponent } from './lst-ctrl/listaCtrl/listaCtrl.component';
import { InfoEstudComponent } from './info-estud/info-estud.component';
import { HorariosComponent } from './horarios/horarios.component';
import { NotasRegistraComponent } from './notas/notas-registra/notas-registra.component';


@NgModule({
  declarations: [
    AppComponent,
    // Aplicación
    ListaClaseComponent,
    BoletaComponent,
    NotasComponent,
    LoginComponent,
    CmbClaveComponent,
    LstCtrlComponent,
    ListaCtrlComponent,
    InfoEstudComponent,
    HorariosComponent,
    NotasRegistraComponent
  ],

  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js',{ enabled: environment.production  }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   // actualizado
    MaterializeModule,
    AppRoutingModule,
  ],

  providers: [AuthGuard, AuthenticationService],

  bootstrap: [AppComponent]
})
export class AppModule {}
