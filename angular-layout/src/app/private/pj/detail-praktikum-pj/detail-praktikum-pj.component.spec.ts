import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPraktikumPjComponent } from './detail-praktikum-pj.component';

describe('DetailPraktikumPjComponent', () => {
  let component: DetailPraktikumPjComponent;
  let fixture: ComponentFixture<DetailPraktikumPjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPraktikumPjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPraktikumPjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
