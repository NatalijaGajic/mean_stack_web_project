import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingInfoComponent } from './ordering-info.component';

describe('OrderingInfoComponent', () => {
  let component: OrderingInfoComponent;
  let fixture: ComponentFixture<OrderingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
