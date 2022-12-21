import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAuditWiseScoreComponent } from './vendor-audit-wise-score.component';

describe('VendorAuditWiseScoreComponent', () => {
  let component: VendorAuditWiseScoreComponent;
  let fixture: ComponentFixture<VendorAuditWiseScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAuditWiseScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAuditWiseScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
