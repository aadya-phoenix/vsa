import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAttendeesComponent } from './vendor-attendees.component';

describe('VendorAttendeesComponent', () => {
  let component: VendorAttendeesComponent;
  let fixture: ComponentFixture<VendorAttendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAttendeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
