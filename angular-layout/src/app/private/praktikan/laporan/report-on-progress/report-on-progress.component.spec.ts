import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnProgressComponent } from './report-on-progress.component';

describe('ReportOnProgressComponent', () => {
  let component: ReportOnProgressComponent;
  let fixture: ComponentFixture<ReportOnProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
