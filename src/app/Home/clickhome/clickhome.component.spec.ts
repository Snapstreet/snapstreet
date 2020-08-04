import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickhomeComponent } from './clickhome.component';

describe('ClickhomeComponent', () => {
  let component: ClickhomeComponent;
  let fixture: ComponentFixture<ClickhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
