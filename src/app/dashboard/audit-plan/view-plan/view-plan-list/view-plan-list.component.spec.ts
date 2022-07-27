import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlanListComponent } from './view-plan-list.component';

describe('ViewPlanListComponent', () => {
  let component: ViewPlanListComponent;
  let fixture: ComponentFixture<ViewPlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
