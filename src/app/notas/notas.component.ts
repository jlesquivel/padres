import { Component, OnInit, EventEmitter } from '@angular/core';
import { NotasService } from './notas.service'
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { Observable } from 'rxjs';

declare var alasql: any;

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [NotasService]
})
export class NotasComponent implements OnInit {

  modalActions = new EventEmitter<string | MaterializeAction>();
  public listas: any;
  public olista: any;

  _cargandoDatos = true;
  _hayDatos = false;
  _errorServidor = false;
  ano = '';
  periodo = '1';
  profesor = 0;
  lista: any;

  constructor(private servicio: NotasService,
              private router: Router) {

  }

  ngOnInit() {

    this.profesor = JSON.parse(localStorage.getItem('datosProf')).id_emp;
    this.lista = [];
    this.servicio.Lista(this.profesor).then(res => {
      this.listas = res;
      console.log(res);
    });
  }

  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  } // ======================================================

  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  } // ======================================================

  onSubmit() {

    let nombre;
    this.servicio.getListaClase(this.profesor, this.periodo).subscribe(
      rs => (this.lista = rs),
      er => (this._errorServidor = true),
      () => {
        this._cargandoDatos = false;
        this._hayDatos = this.lista.length > 0;
        this._errorServidor = !this._hayDatos;

        if (this._hayDatos) {

          this.servicio.ListaGuarda(this.lista, this.profesor);

          this.lista = [];
          this.servicio.Lista(this.profesor).then(res => {
            this.listas = res;
            // console.log(res);   // despliega por consola
          });

        }
      }
    );
    this.closeModal();
  }

  ListaCtr(item) {
    console.log(item);
    this.router.navigate(['/notasReg', item.id]).then(() => {});
  }

}
