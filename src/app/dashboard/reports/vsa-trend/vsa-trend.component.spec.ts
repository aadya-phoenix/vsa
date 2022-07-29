import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsaTrendComponent } from './vsa-trend.component';

describe('VsaTrendComponent', () => {
  let component: VsaTrendComponent;
  let fixture: ComponentFixture<VsaTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VsaTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VsaTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
