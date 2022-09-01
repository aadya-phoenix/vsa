import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanAuditorComponent } from './action-plan-auditor.component';

describe('ActionPlanAuditorComponent', () => {
  let component: ActionPlanAuditorComponent;
  let fixture: ComponentFixture<ActionPlanAuditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanAuditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanAuditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
