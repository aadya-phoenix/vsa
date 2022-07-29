import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsaStatusComponent } from './vsa-status.component';

describe('VsaStatusComponent', () => {
  let component: VsaStatusComponent;
  let fixture: ComponentFixture<VsaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VsaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
