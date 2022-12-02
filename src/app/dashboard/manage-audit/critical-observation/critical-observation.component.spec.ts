import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalObservationComponent } from './critical-observation.component';

describe('CriticalObservationComponent', () => {
  let component: CriticalObservationComponent;
  let fixture: ComponentFixture<CriticalObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriticalObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
