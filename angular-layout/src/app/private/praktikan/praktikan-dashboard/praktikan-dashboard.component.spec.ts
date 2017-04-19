import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraktikanDashboardComponent } from './praktikan-dashboard.component';

describe('PraktikanDashboardComponent', () => {
  let component: PraktikanDashboardComponent;
  let fixture: ComponentFixture<PraktikanDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraktikanDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraktikanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
