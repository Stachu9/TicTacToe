import { TestBed } from '@angular/core/testing';

import { EngineHelperService } from './engine-helper.service';

describe('EngineHelperService', () => {
  let service: EngineHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
