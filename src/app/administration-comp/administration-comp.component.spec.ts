import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCompComponent } from './administration-comp.component';

describe('AdministrationCompComponent', () => {
  let component: AdministrationCompComponent;
  let fixture: ComponentFixture<AdministrationCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
