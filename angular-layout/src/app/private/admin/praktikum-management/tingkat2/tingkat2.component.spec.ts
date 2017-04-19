import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tingkat2Component } from './tingkat2.component';

describe('Tingkat2Component', () => {
  let component: Tingkat2Component;
  let fixture: ComponentFixture<Tingkat2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tingkat2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tingkat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
