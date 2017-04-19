import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetugasManagementComponent } from './petugas-management.component';

describe('PetugasManagementComponent', () => {
  let component: PetugasManagementComponent;
  let fixture: ComponentFixture<PetugasManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetugasManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetugasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
