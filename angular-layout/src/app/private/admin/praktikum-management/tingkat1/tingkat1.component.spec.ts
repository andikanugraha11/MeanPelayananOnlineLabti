import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tingkat1Component } from './tingkat1.component';

describe('Tingkat1Component', () => {
  let component: Tingkat1Component;
  let fixture: ComponentFixture<Tingkat1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tingkat1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tingkat1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
