import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjDashboardComponent } from './pj-dashboard.component';

describe('PjDashboardComponent', () => {
  let component: PjDashboardComponent;
  let fixture: ComponentFixture<PjDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
