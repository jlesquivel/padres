import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotasRegistraService } from './notas-registra.service'

declare var alasql: any;
declare var Materialize: any;

@Component({
  selector: 'app-notas-registra',
  templateUrl: './notas-registra.component.html',
  styleUrls: ['./notas-registra.component.css'],
  providers: [NotasRegistraService]
})
export class NotasRegistraComponent implements OnInit {

  listaNum:any;
  sub:any;
  listaClase:any;
  lista: any;

  _cargandoDatos = true;
  _hayDatos = false;
  _errorServidor = false;
  _borrar = false;

  constructor(private router: Router, private servicio: NotasRegistraService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params // obtiene como parametro el nombre de la lista
      .subscribe(params => {
        this.listaNum = params['id'];  //  +params['id']  converts string 'id' to a number
        // console.log(this.listaNum);

        this.servicio.listaEstudCargar(this.listaNum)
        .then((res) => { this.listaClase = JSON.parse(res) });

      });
  }


  eliminar(){};


}
