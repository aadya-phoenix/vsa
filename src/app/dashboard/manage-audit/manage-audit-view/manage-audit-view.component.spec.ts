import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditViewComponent } from './manage-audit-view.component';

describe('ManageAuditViewComponent', () => {
  let component: ManageAuditViewComponent;
  let fixture: ComponentFixture<ManageAuditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
