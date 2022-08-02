import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditQuestionCategoryComponent } from './manage-audit-question-category.component';

describe('ManageAuditQuestionCategoryComponent', () => {
  let component: ManageAuditQuestionCategoryComponent;
  let fixture: ComponentFixture<ManageAuditQuestionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditQuestionCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditQuestionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
