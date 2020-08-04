import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecteddetailsellerComponent } from './selecteddetailseller.component';

describe('SelecteddetailsellerComponent', () => {
  let component: SelecteddetailsellerComponent;
  let fixture: ComponentFixture<SelecteddetailsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecteddetailsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecteddetailsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
