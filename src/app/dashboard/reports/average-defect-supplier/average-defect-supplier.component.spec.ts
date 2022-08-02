import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDefectSupplierComponent } from './average-defect-supplier.component';

describe('AverageDefectSupplierComponent', () => {
  let component: AverageDefectSupplierComponent;
  let fixture: ComponentFixture<AverageDefectSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageDefectSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageDefectSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
