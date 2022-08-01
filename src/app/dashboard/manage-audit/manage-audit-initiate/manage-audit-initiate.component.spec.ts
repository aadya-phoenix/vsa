import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuditInitiateComponent } from './manage-audit-initiate.component';

describe('ManageAuditInitiateComponent', () => {
  let component: ManageAuditInitiateComponent;
  let fixture: ComponentFixture<ManageAuditInitiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuditInitiateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAuditInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
