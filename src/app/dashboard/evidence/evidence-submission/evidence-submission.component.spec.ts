import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceSubmissionComponent } from './evidence-submission.component';

describe('EvidenceSubmissionComponent', () => {
  let component: EvidenceSubmissionComponent;
  let fixture: ComponentFixture<EvidenceSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
