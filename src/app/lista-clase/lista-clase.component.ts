import { Component, OnInit, EventEmitter } from '@angular/core';

import { ListaClaseService } from './lista-clase.service';
import { ListaClase } from './lista-clase';
import { Ausencia } from './ausencia';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-lista-clase',
  templateUrl: './lista-clase.component.html',
  styleUrls: ['./lista-clase.component.css'],
  providers: [ListaClaseService]
})

export class ListaClaseComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();

  id_usuario = '';
  ano = '2016';
  nivel = '05';
  grupo = '1';
  fecha = '26-2-2016';
  leccion = '1';
  nombre = '';

  title = `${this.nivel}-${this.grupo}`;

  lista: ListaClase[];
  prof: any;
  _cargandoDatos = true;
  _hayDatos = false;
  _errorServidor = false;

  public seleccionado = '';
  public oAusencia: Ausencia;

  constructor(private servicio: ListaClaseService) {}

  ngOnInit() {
    this.prof = this.servicio.datosProf();

    localStorage.setItem("datosProf" ,JSON.stringify(this.prof) ) ;
   
    this._cargandoDatos = true;
    this.id_usuario = '';
    this.title = `${this.nivel}-${this.grupo}`;
    this.nombre = this.prof.nombre;

    // obtiene información
    this.servicio
      .getListaClaseP(
        this.ano,
        this.nivel,
        this.grupo,
        this.fecha,
        this.leccion
      )
      .subscribe(
        rs => (this.lista = rs),
        er => {this._cargandoDatos = false; 
              this._errorServidor = true;
            },
        () => {
          this._cargandoDatos = false;
          this._hayDatos = this.lista.length > 0;
          this._errorServidor = !this._hayDatos;
          // console.log('Registros: ', this.lista.length);  // dea
        }
      );
  }

  // region métodos para abrir y cerrar ventana modales

  openModal(p_estud: ListaClase) {
    this.seleccionado = p_estud.nombre;
    // console.log (p_estud.id);
    this.oAusencia = new Ausencia(
      p_estud.id,
      p_estud.carnet,
      null,
      null,
      this.leccion,
      'A',
      null,
      null,
      null
    );

    this.modalActions.emit({ action: 'modal', params: ['open'] });
  } // ======================================================

  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  } // ======================================================

  // endregion

  cambiaEstado(estado: string) {
    this.oAusencia.tipo = estado;
    this.setTipo(this.oAusencia.carnet, estado);

    this.servicio
      .setEstadoAusencia(this.oAusencia)
      .subscribe(() => {}, er => console.log(er), () => {});

    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }
  setTipo(carnet, estado) {
    for (let i = 0; i < this.lista.length; i++) {
      if (this.lista[i].carnet === carnet) {
        this.lista[i].ausencia = estado;
        return;
      }
    }
  }
}
