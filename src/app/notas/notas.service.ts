import { Injectable, isDevMode } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';

declare var alasql: any;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class NotasService {
private _servidor;

constructor(private http: HttpClient) {

this._servidor = environment.apiUrl;
}

// #region funciones
    Lista( profesor): any {
      return alasql.promise(`ATTACH INDEXEDDB DATABASE prof; \
          SELECT nombre,nivel,grupo,periodo,id \
          FROM prof.notas WHERE cedula = ${profesor} `)
            .then(res => {
              return res[1];
          });
    }

    getListaClase(profesor, periodo): Observable<any> {

      let url = `${this._servidor}/notasProf/${profesor}/${periodo}`;
      return this.http.get<any>(url, httpOptions);
    }

    ListaGuarda(listas: any , profesor: any) {

      let asds = alasql.promise([
        'ATTACH INDEXEDDB DATABASE prof'
        , `DELETE FROM prof.notas WHERE cedula = ${profesor}`
      ]).then(function(res) {
        // console.log('Result from last query:',res.pop())
      }).catch(function(reason) {
        console.log('Error:------', reason)
      });

      alasql
        .promise(`ATTACH INDEXEDDB DATABASE prof;  \
                  SELECT * INTO prof.notas FROM ?`, [listas])
        .then(function(res) {
          // console.log('res => ', res);
        });

    }
// #endregion
}
