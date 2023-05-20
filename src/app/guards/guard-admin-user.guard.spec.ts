import { TestBed } from '@angular/core/testing';

import { GuardAdminUserGuard } from './guard-admin-user.guard';

describe('GuardAdminUserGuard', () => {
  let guard: GuardAdminUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardAdminUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
