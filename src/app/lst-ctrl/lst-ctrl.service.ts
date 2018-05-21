import { Listas } from './listas';
import { ListaClase } from './lista-clase';

import { Injectable, isDevMode } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare var alasql: any;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class LstCtrlService {
  public resp: any;
  private _servidor;

  constructor(private http: HttpClient ) {
    this._servidor = environment.apiUrl;
  }

  creaLista(creado, nombre, grupo) {}
  // CREADO POR :Jose Luis Esquivel ,2017
  //
  // TODO : Borrar lista de INDEXEDB
  borrarLista(id) {}

  Lista(): any {
    return alasql.promise('ATTACH INDEXEDDB DATABASE prof; SELECT * FROM prof.listas').then(res => {
      return JSON.stringify(res[1]);
    });
  }

  ListasGuarda(listas: Listas) {
    // Guarda en la lista
    alasql
      .promise('ATTACH INDEXEDDB DATABASE prof;\
                        SELECT * INTO prof.listas FROM ?', [[listas]])
      .then(function(res) {
        // console.log('res => ', res);
      });
  }

  // CREADO POR :Jose Luis Esquivel ,2017
  // recib nombre de la lista y la lista del grupo de estudiante
  // y lo guarda a nivel local en INDEXEDDB
  listaEstudGuarda(nombre: string, listaEst: ListaClase[]) {
    let glista = [];
    glista.push({ nombre: nombre, estudiantes: listaEst });

    alasql
      .promise('ATTACH INDEXEDDB DATABASE prof;\
                        SELECT * INTO prof.alumnos FROM ?', [glista])
      .then(function(res) {
        // console.log('res => ', res);
      });
  }

  ListaDatos(id: number) {}

  Grupos() : Observable<any> {
    let ano = new Date().getFullYear().toString(); // obtiene año actual
    let url = `${this._servidor}/grupos/${ano}`;
    return this.http.get<any>(url, httpOptions);
  }

  getListaClase(ano, nivel, grupo) : Observable<any>{
    let url = `${this._servidor}/ListaClase/${ano}/${nivel}/${grupo}`;
    return this.http.get<any>(url, httpOptions);
  }
} // fin de la clase
