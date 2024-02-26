import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hasAuthorityGuard } from './has-authority.guard';

describe('hasAuthorityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hasAuthorityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
