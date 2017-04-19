import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetugasDashboardComponent } from './petugas-dashboard.component';

describe('PetugasDashboardComponent', () => {
  let component: PetugasDashboardComponent;
  let fixture: ComponentFixture<PetugasDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetugasDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetugasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
