import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistStatusComponent } from './dist-status.component';

describe('DistStatusComponent', () => {
  let component: DistStatusComponent;
  let fixture: ComponentFixture<DistStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
