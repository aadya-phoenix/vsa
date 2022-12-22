import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSummaryYearWiseComponent } from './vendor-summary-year-wise.component';

describe('VendorSummaryComponent', () => {
  let component: VendorSummaryYearWiseComponent;
  let fixture: ComponentFixture<VendorSummaryYearWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSummaryYearWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSummaryYearWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
