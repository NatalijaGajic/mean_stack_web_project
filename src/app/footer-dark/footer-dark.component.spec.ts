import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDarkComponent } from './footer-dark.component';

describe('FooterDarkComponent', () => {
  let component: FooterDarkComponent;
  let fixture: ComponentFixture<FooterDarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
