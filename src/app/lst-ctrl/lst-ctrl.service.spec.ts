/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LstCtrlService } from './lst-ctrl.service';

describe('Service: LstCtrl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LstCtrlService]
    });
  });

  it('should ...', inject([LstCtrlService], (service: LstCtrlService) => {
    expect(service).toBeTruthy();
  }));
});