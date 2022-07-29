import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDefectComponent } from './average-defect.component';

describe('AverageDefectComponent', () => {
  let component: AverageDefectComponent;
  let fixture: ComponentFixture<AverageDefectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageDefectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
