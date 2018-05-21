import { ListaClase } from './../lista-clase';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var alasql: any;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class ListaCtrlService {
  public resp: any;
  private _servidor;

  lista: ListaClase[];
  resultado: string;

  constructor(private http: HttpClient) {

    this._servidor = environment.apiUrl;
    alasql.options.errorlog = true;
  }

  // #region funciones

  listaEstudCargar(nlista): any {
    return alasql
      .promise(
        `ATTACH INDEXEDDB DATABASE prof; \
         SELECT COLUMN estudiantes FROM prof.alumnos where nombre= "${nlista}"`
      )
      .then(res => {
        return JSON.stringify(res[1][0]);
      });
  }

  listaEstudGuarda(nlista: string, borrar: boolean, listaEst: ListaClase[]) {
    let glista = [];
    glista.push({ estudiantes: listaEst, nombre: nlista });

    if (borrar) {
      alasql
        .promise(`ATTACH INDEXEDDB DATABASE prof; \
          DELETE FROM prof.listas WHERE nombre = "${nlista}" ; \
          DELETE FROM prof.alumnos where nombre = "${nlista}" `)
        .then(function(res) {
          // console.log('res => ', res);
        });
    } else {   // ACTUALIZA
      alasql
        .promise(
          `ATTACH INDEXEDDB DATABASE prof; \
          DELETE FROM prof.alumnos where nombre= "${nlista}" ; \
          SELECT * INTO prof.alumnos FROM ? `,
          [glista]
        )
        .then(function(res) {
          // console.log('res => ', res);
        });
    }
  }
  // #endregion
}
