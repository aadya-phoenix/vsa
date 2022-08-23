import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceReceivedComponent } from './evidence-received.component';

describe('EvidenceReceivedComponent', () => {
  let component: EvidenceReceivedComponent;
  let fixture: ComponentFixture<EvidenceReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
