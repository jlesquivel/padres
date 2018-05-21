import { Component, OnInit, EventEmitter } from '@angular/core';
import { LstCtrlService } from './lst-ctrl.service';
import { Listas } from './listas';
import { MaterializeAction } from 'angular2-materialize';

import { FormGroup, FormControl } from '@angular/forms';
import { ListaClase } from './lista-clase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lst-ctrl',
  templateUrl: './lst-ctrl.component.html',
  styleUrls: ['./lst-ctrl.component.css'],
  providers: [LstCtrlService]
})
export class LstCtrlComponent implements OnInit {
  public olista: any;
  public listas: Listas[];
  public selectOptions = [];
  modalActions = new EventEmitter<string | MaterializeAction>();
  public form: FormGroup;
  public usuario;

  ano = '2017';
  nivel = '00';
  grupo = '1';
  lista: ListaClase[];
  _cargandoDatos = true;
  _hayDatos = false;
  _errorServidor = false;

  constructor(private servicio: LstCtrlService, 
              private router: Router) {
    this.olista = { nombre: '', descrip: '', grupo: '' };
    this.crearControles();
    // console.log('listaCtrl contructor');

    this.servicio.Grupos().subscribe(
      rs => (this.selectOptions = rs),
      er => {},
      () => {
        this._cargandoDatos = false;
        this._hayDatos = this.selectOptions.length > 0;
        this._errorServidor = !this._hayDatos;
      }
    );
  }

  crearControles() {
    // fomulario
    this.form = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      grupo: new FormControl()
    });
  }

  ngOnInit() {
    // console.log('listaCtrl ngOnInit');
    this.servicio.Lista().then(res => {
      this.listas = JSON.parse(res);
    });
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  } // ======================================================

  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  } // ======================================================

  // CREADO POR :Jose Luis Esquivel ,2017
  //
  onSubmit() {
    let nombre = this.olista.nombre;
    let grupo = this.olista.grupo;

    let obj = this.listas.find(x => x.nombre === this.olista.nombre);
    let index = this.listas.indexOf(obj);
    if (index >= 0) {
      return false;
    } // si nombre existe en la lista no agrega

    this.ano = new Date().getFullYear().toString(); // obtiene año actual
    this.nivel = grupo.substring(0, 2);
    this.grupo = grupo.substring(3, 4);

    this.servicio.getListaClase(this.ano, this.nivel, this.grupo).subscribe(
      rs => (this.lista = rs),
      er => (this._errorServidor = true),
      () => {
        this._cargandoDatos = false;
        this._hayDatos = this.lista.length > 0;
        this._errorServidor = !this._hayDatos;

        if (this._hayDatos) {
          this.servicio.listaEstudGuarda(nombre, this.lista);

          this.servicio.ListasGuarda(this.olista);
          this.servicio.Lista().then(res => {
            this.listas = JSON.parse(res);
          });
          this.listas.push(this.olista);
          this.olista = { nombre: '', descrip: '', grupo: '' };
        }
      }
    );

    this.closeModal();
  } // ===========================================================

  // CREADO POR :Jose Luis Esquivel ,2017
  // Carga la lista de control
  ListaCtr(item) {
    this.router.navigate(['/listaCtrl', item.nombre]).then(() => {});
  }

  public validaNombre() {

    if (this.form.controls['nombre'].value !== '') {
      let obj = this.listas.find(x => x.nombre === this.olista.nombre);
      let index = this.listas.indexOf(obj);
      if (index >= 0) {
        return true;
      }
      return !this.form.controls['nombre'].valid;
    } else {
      return true;
    }
  }

}
