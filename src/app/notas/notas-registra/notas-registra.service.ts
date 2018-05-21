import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var alasql: any;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class NotasRegistraService {
  public resp: any;
  private _servidor;

  lista:any;
  resultado: string;

  constructor(private http: HttpClient) {
    this._servidor = environment.apiUrl;
    alasql.options.errorlog = true;
  }

  listaEstudCargar(id_lista): any {
    return alasql
      .promise(
        `ATTACH INDEXEDDB DATABASE prof; \
         SELECT COLUMN estudiantes FROM prof.notas where id= "${id_lista}"`
      )
      .then(res => {
        return JSON.stringify(res[1][0]);
      });
  }

}
