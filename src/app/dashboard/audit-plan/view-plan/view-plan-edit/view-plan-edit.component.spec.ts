import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanEditComponent } from './view-plan-edit.component';

describe('ViewPlanEditComponent', () => {
  let component: ViewPlanEditComponent;
  let fixture: ComponentFixture<ViewPlanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
