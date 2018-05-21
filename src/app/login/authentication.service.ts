import { Injectable, isDevMode } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { toast } from 'angular2-materialize';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  // private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private _servidor: string;

  constructor(private http: HttpClient) {

    this._servidor = environment.apiUrl;
    console.log(this._servidor );
  }

  public login(username: string, password: string) {
    // console.log('login*****');
    let url = `${this._servidor}/authenticate/`;
    let iJson = JSON.stringify({ usuario: username, clave: password });

    return this.http.post(url, iJson, this.httpOptions );
  } // cierre login


} // cierra clase
