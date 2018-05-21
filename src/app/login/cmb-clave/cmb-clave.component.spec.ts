/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CmbClaveComponent } from './cmb-clave.component';

describe('CmbClaveComponent', () => {
  let component: CmbClaveComponent;
  let fixture: ComponentFixture<CmbClaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmbClaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmbClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});