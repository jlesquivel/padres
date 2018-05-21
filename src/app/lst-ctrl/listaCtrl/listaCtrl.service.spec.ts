/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListaCtrlService } from './listaCtrl.service';

describe('Service: ListaCtrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaCtrlService]
    });
  });

  it('should ...', inject([ListaCtrlService], (service: ListaCtrlService) => {
    expect(service).toBeTruthy();
  }));
});