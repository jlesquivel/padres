import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

declare var alasql: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Éxito..!';
  public visibleMenu = false;
  public usuario: string;
  public correo: string;
  public imagen: any;
  public token: any;

  constructor(private auth: AuthGuard, private router: Router ) {
    alasql.options.errorlog = true;
    // alasql.promise('ATTACH INDEXEDDB DATABASE prof; DROP INDEXEDDB DATABASE prof');

  }

  ngOnInit() {

    alasql.promise(
      '  \
         CREATE INDEXEDDB DATABASE IF NOT EXISTS prof; \
         ATTACH INDEXEDDB DATABASE prof; \
         CREATE TABLE IF NOT EXISTS prof.listas;\
         CREATE TABLE IF NOT EXISTS prof.alumnos; \
         CREATE TABLE IF NOT EXISTS prof.notas;'
    );

    this.auth.menuEmmiter.subscribe(mostrar => {
      this.visibleMenu = mostrar;
      this.token = localStorage.getItem('currentUser');
      if (tokenNotExpired(null, this.token)) {
        let jwtHelper: JwtHelper = new JwtHelper();
        let datos = JSON.parse(
          JSON.stringify(jwtHelper.decodeToken(this.token))
        );

        // console.log(datos);
        this.usuario = datos.nombre;
        this.correo = datos.correo;
        this.imagen = datos.foto;
      } else {
        // si expiro
        this.salir();
      }
    });
  }

  salir() {
    this.visibleMenu = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']).then(() => {});
  }
}
