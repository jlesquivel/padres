import { Component, OnInit } from '@angular/core';
import { BoletaService } from './boleta.service';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css'],
  providers: [BoletaService]
})
export class BoletaComponent implements OnInit {
  dEstudiante: any;

  autocompleteInit = {
    data: { '': null },
    onAutocomplete: val => {
      console.log(val);
    }
  };

  constructor(private servicio: BoletaService) {}

  ngOnInit() {
    this.autocompleteInit.data = this.dEstudiante;
  }
}
