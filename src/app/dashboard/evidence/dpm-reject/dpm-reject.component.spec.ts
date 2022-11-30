import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpmRejectComponent } from './dpm-reject.component';

describe('DpmRejectComponent', () => {
  let component: DpmRejectComponent;
  let fixture: ComponentFixture<DpmRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpmRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DpmRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
