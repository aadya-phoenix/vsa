import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditReportComponent } from './manage-audit-report.component';

describe('ManageAuditReportComponent', () => {
  let component: ManageAuditReportComponent;
  let fixture: ComponentFixture<ManageAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
