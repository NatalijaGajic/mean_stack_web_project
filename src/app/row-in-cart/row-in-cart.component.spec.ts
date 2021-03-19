import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowInCartComponent } from './row-in-cart.component';

describe('RowInCartComponent', () => {
  let component: RowInCartComponent;
  let fixture: ComponentFixture<RowInCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowInCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowInCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
