import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanUpdateComponent } from './action-plan-update.component';

describe('ActionPlanUpdateComponent', () => {
  let component: ActionPlanUpdateComponent;
  let fixture: ComponentFixture<ActionPlanUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
