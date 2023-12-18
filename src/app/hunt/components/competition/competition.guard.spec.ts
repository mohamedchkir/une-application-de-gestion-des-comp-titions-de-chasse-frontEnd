import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { competitionGuard } from './competition.guard';

describe('competitionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => competitionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
