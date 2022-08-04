import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWiseScoreComponent } from './vendor-wise-score.component';

describe('VendorWiseScoreComponent', () => {
  let component: VendorWiseScoreComponent;
  let fixture: ComponentFixture<VendorWiseScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorWiseScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorWiseScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
