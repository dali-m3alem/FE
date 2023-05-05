import { TestBed } from '@angular/core/testing';

import { GuardmanagerGuard } from './guardmanager.guard';

describe('GuardmanagerGuard', () => {
  let guard: GuardmanagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardmanagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
