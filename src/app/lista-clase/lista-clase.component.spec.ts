/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ListaClaseComponent} from './lista-clase.component';

describe('ListaClaseComponent', () => {
  let component: ListaClaseComponent;
  let fixture: ComponentFixture<ListaClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaClaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
