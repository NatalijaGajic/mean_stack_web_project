import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormSignupComponent } from './user-form-signup.component';

describe('UserFormSignupComponent', () => {
  let component: UserFormSignupComponent;
  let fixture: ComponentFixture<UserFormSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
