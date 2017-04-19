import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tingkat4Component } from './tingkat4.component';

describe('Tingkat4Component', () => {
  let component: Tingkat4Component;
  let fixture: ComponentFixture<Tingkat4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tingkat4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tingkat4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
