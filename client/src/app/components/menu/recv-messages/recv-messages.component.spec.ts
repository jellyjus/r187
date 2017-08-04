import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecvMessagesComponent } from './recv-messages.component';

describe('RecvMessagesComponent', () => {
  let component: RecvMessagesComponent;
  let fixture: ComponentFixture<RecvMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecvMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecvMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
