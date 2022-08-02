import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingStatusComponent } from './pending-status.component';

describe('PendingStatusComponent', () => {
  let component: PendingStatusComponent;
  let fixture: ComponentFixture<PendingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
