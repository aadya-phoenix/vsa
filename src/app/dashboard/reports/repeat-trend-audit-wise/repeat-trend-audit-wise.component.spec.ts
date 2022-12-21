import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatTrendAuditWiseComponent } from './repeat-trend-audit-wise.component';

describe('RepeatTrendAuditWiseComponent', () => {
  let component: RepeatTrendAuditWiseComponent;
  let fixture: ComponentFixture<RepeatTrendAuditWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatTrendAuditWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatTrendAuditWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
