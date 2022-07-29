import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDistStatusComponent } from './vendor-dist-status.component';

describe('VendorDistStatusComponent', () => {
  let component: VendorDistStatusComponent;
  let fixture: ComponentFixture<VendorDistStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDistStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDistStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
