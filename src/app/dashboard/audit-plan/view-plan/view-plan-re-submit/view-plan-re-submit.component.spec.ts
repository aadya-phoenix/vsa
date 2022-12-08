import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanReSubmitComponent } from './view-plan-re-submit.component';

describe('ViewPlanReSubmitComponent', () => {
  let component: ViewPlanReSubmitComponent;
  let fixture: ComponentFixture<ViewPlanReSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanReSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanReSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
