import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyProductsComponent } from './body-products.component';

describe('BodyProductsComponent', () => {
  let component: BodyProductsComponent;
  let fixture: ComponentFixture<BodyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
