import { TestBed, inject } from '@angular/core/testing';

import { InsertService } from './insert.service';

describe('InsertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsertService]
    });
  });

  it('should be created', inject([InsertService], (service: InsertService) => {
    expect(service).toBeTruthy();
  }));
});
