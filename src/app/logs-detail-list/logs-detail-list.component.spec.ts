import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDetailListComponent } from './logs-detail-list.component';

describe('LogsDetailListComponent', () => {
  let component: LogsDetailListComponent;
  let fixture: ComponentFixture<LogsDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsDetailListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
