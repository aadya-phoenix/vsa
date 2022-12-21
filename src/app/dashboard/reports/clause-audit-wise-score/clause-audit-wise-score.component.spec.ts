import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseAuditWiseScoreComponent } from './clause-audit-wise-score.component';

describe('ClauseAuditWiseScoreComponent', () => {
  let component: ClauseAuditWiseScoreComponent;
  let fixture: ComponentFixture<ClauseAuditWiseScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClauseAuditWiseScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseAuditWiseScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
