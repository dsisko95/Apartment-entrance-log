import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsCompComponent } from './logs-comp.component';

describe('LogsCompComponent', () => {
  let component: LogsCompComponent;
  let fixture: ComponentFixture<LogsCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
