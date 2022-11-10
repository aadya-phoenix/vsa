import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditSummaryComponent } from './manage-audit-summary.component';

describe('ManageAuditSummaryComponent', () => {
  let component: ManageAuditSummaryComponent;
  let fixture: ComponentFixture<ManageAuditSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
