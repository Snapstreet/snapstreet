import { TestBed } from '@angular/core/testing';

import { BuyerSelectedPropertyService } from './buyer-selected-property.service';

describe('BuyerSelectedPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerSelectedPropertyService = TestBed.get(BuyerSelectedPropertyService);
    expect(service).toBeTruthy();
  });
});
