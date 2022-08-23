import { TestBed } from '@angular/core/testing';

import { AuditExecutionService } from './audit-execution.service';

describe('AuditExecutionService', () => {
  let service: AuditExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
