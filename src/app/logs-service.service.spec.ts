import { TestBed, inject } from '@angular/core/testing';

import { LogsServiceService } from './logs-service.service';

describe('LogsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogsServiceService]
    });
  });

  it('should be created', inject([LogsServiceService], (service: LogsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
