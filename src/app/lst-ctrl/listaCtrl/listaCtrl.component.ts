
import { ListaCtrlService } from './listaCtrl.service';
import { ListaClase } from './../lista-clase';
import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var alasql: any;
declare var Materialize: any;

@Component({
  selector: 'app-lista-ctrl',
  templateUrl: './listaCtrl.component.html',
  styleUrls: ['./listaCtrl.component.css'],
  providers: [ListaCtrlService]
})

export class ListaCtrlComponent implements OnInit, OnDestroy, AfterViewChecked {

  // PROPIEDADES ********************
  lista: any;
  sub: any;
  listaClase: ListaClase[];

  _cargandoDatos = true;
  _hayDatos = false;
  _errorServidor = false;
  _borrar = false;

  // METODOS *****************
  constructor(private router: Router, private servicio: ListaCtrlService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params // obtiene como parametro el nombre de la lista
      .subscribe(params => {
        this.lista = params['id']; //  +params['id']  converts string 'id' to a number
      });

    this.servicio.listaEstudCargar(this.lista)
      .then((res) => { this.listaClase = JSON.parse(res) });
  }

   ngAfterViewChecked() {
     Materialize.updateTextFields();
   }

  eliminar() {
    // console.log('eliminar');
    this._borrar = true;
    this.router.navigateByUrl('/listaControl').then(() => { });
  }

  ngOnDestroy() {
    // console.log(this.lista, this.listaClase);
    this.servicio.listaEstudGuarda(this.lista, this._borrar, this.listaClase)
    this.sub.unsubscribe();
  }

}// ++++++++++++++++++++++++++++++
