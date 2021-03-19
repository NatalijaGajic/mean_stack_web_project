import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageUsersComponent } from './admin-page-users.component';

describe('AdminPageUsersComponent', () => {
  let component: AdminPageUsersComponent;
  let fixture: ComponentFixture<AdminPageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
