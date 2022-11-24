import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceExecutiveSummaryComponent } from './evidence-executive-summary.component';

describe('EvidenceExecutiveSummaryComponent', () => {
  let component: EvidenceExecutiveSummaryComponent;
  let fixture: ComponentFixture<EvidenceExecutiveSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceExecutiveSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceExecutiveSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
