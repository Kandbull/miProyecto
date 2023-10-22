import { TestBed } from '@angular/core/testing';

import { WardGuard } from './ward.guard';

describe('WardGuard', () => {
  let guard: WardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
