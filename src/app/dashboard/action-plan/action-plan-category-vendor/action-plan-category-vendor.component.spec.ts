import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanCategoryVendorComponent } from './action-plan-category-vendor.component';

describe('ActionPlanCategoryVendorComponent', () => {
  let component: ActionPlanCategoryVendorComponent;
  let fixture: ComponentFixture<ActionPlanCategoryVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanCategoryVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanCategoryVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
