import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageOrdersComponent } from './admin-page-orders.component';

describe('AdminPageOrdersComponent', () => {
  let component: AdminPageOrdersComponent;
  let fixture: ComponentFixture<AdminPageOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
