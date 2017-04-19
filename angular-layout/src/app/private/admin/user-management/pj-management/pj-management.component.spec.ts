import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjManagementComponent } from './pj-management.component';

describe('PjManagementComponent', () => {
  let component: PjManagementComponent;
  let fixture: ComponentFixture<PjManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
