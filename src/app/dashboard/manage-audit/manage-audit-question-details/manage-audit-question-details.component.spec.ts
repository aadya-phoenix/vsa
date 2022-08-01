import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditQuestionDetailsComponent } from './manage-audit-question-details.component';

describe('ManageAuditQuestionDetailsComponent', () => {
  let component: ManageAuditQuestionDetailsComponent;
  let fixture: ComponentFixture<ManageAuditQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
