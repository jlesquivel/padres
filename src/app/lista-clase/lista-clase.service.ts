import { Injectable, isDevMode } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders ,HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListaClase } from './lista-clase';
import { Ausencia } from './ausencia';


import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class ListaClaseService {

  private _servidor;
  private token: any;

  // TODO : CAMBIAR URL: PARA QUE seleccione la lista de clase de acuerdo dia y clase
  // que le toca al profesor {necesita autenticar}

  constructor(private http: HttpClient) {
    this._servidor = environment.apiUrl;
  }

  datosProf(): any {
    this.token = localStorage.getItem('currentUser');
    if (tokenNotExpired(null, this.token)) {
      let jwtHelper: JwtHelper = new JwtHelper();
      return JSON.parse(JSON.stringify(jwtHelper.decodeToken(this.token)));
    }
  }

  getListaClaseP(ano, nivel, grupo, fecha, leccion): Observable<Array<ListaClase>> {
    let url = `${this._servidor}/listaclaseausencias/${ano}/${nivel}/${grupo}/${fecha}/${leccion}`;
    return this.http.get<Array<ListaClase>>(url, httpOptions) ;
  }

  setEstadoAusencia(_ausencia: Ausencia) {
    let url = `${this._servidor}/cambiarEstadoAusencia/`;
    let iJson = JSON.stringify(_ausencia);

    return this.http.post(url, iJson,httpOptions);
  }
}
