import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceAuditorRemarksComponent } from './evidence-auditor-remarks.component';

describe('EvidenceAuditorRemarksComponent', () => {
  let component: EvidenceAuditorRemarksComponent;
  let fixture: ComponentFixture<EvidenceAuditorRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceAuditorRemarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceAuditorRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
