import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tingkat3Component } from './tingkat3.component';

describe('Tingkat3Component', () => {
  let component: Tingkat3Component;
  let fixture: ComponentFixture<Tingkat3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tingkat3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tingkat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
