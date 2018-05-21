import { TestBed, inject } from '@angular/core/testing';

import { NotasRegistraService } from './notas-registra.service';

describe('NotasRegistraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotasRegistraService]
    });
  });

  it('should be created', inject([NotasRegistraService], (service: NotasRegistraService) => {
    expect(service).toBeTruthy();
  }));
});
