import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanAuditorCategoryComponent } from './action-plan-auditor-category.component';

describe('ActionPlanAuditorCategoryComponent', () => {
  let component: ActionPlanAuditorCategoryComponent;
  let fixture: ComponentFixture<ActionPlanAuditorCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanAuditorCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanAuditorCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
