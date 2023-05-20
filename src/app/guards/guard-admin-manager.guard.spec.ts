import { TestBed } from '@angular/core/testing';

import { GuardAdminManagerGuard } from './guard-admin-manager.guard';

describe('GuardAdminManagerGuard', () => {
  let guard: GuardAdminManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardAdminManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
