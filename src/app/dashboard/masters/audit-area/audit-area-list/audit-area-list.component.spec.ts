import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAreaListComponent } from './audit-area-list.component';

describe('AuditAreaListComponent', () => {
  let component: AuditAreaListComponent;
  let fixture: ComponentFixture<AuditAreaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditAreaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
