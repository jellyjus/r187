import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTCComponent } from './rtc.component';

describe('RTCComponent', () => {
  let component: RTCComponent;
  let fixture: ComponentFixture<RTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
