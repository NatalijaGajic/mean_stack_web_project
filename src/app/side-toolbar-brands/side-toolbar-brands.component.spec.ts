import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideToolbarBrandsComponent } from './side-toolbar-brands.component';

describe('SideToolbarBrandsComponent', () => {
  let component: SideToolbarBrandsComponent;
  let fixture: ComponentFixture<SideToolbarBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideToolbarBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolbarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
