import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceAuditsComponent } from './evidence-audits.component';

describe('EvidenceAuditsComponent', () => {
  let component: EvidenceAuditsComponent;
  let fixture: ComponentFixture<EvidenceAuditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceAuditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
