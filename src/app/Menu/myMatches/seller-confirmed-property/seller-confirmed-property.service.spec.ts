import { TestBed } from '@angular/core/testing';

import { SellerConfirmedPropertyService } from './seller-confirmed-property.service';

describe('SellerConfirmedPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerConfirmedPropertyService = TestBed.get(SellerConfirmedPropertyService);
    expect(service).toBeTruthy();
  });
});
