import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpmReportComponent } from './dpm-report.component';

describe('DpmReportComponent', () => {
  let component: DpmReportComponent;
  let fixture: ComponentFixture<DpmReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpmReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpmReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
