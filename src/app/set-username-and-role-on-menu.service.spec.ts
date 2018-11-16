import { TestBed, inject } from '@angular/core/testing';

import { SetUsernameAndRoleOnMenuService } from './set-username-and-role-on-menu.service';

describe('SetUsernameAndRoleOnMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetUsernameAndRoleOnMenuService]
    });
  });

  it('should be created', inject([SetUsernameAndRoleOnMenuService], (service: SetUsernameAndRoleOnMenuService) => {
    expect(service).toBeTruthy();
  }));
});
