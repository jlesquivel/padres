import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasRegistraComponent } from './notas-registra.component';

describe('NotasRegistraComponent', () => {
  let component: NotasRegistraComponent;
  let fixture: ComponentFixture<NotasRegistraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasRegistraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasRegistraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
