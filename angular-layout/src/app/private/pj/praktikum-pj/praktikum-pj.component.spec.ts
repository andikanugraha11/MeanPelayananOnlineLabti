import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraktikumPjComponent } from './praktikum-pj.component';

describe('PraktikumPjComponent', () => {
  let component: PraktikumPjComponent;
  let fixture: ComponentFixture<PraktikumPjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraktikumPjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraktikumPjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
