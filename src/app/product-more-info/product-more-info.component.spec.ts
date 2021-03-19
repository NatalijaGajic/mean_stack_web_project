import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMoreInfoComponent } from './product-more-info.component';

describe('ProductMoreInfoComponent', () => {
  let component: ProductMoreInfoComponent;
  let fixture: ComponentFixture<ProductMoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
