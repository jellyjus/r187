import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmoModeComponent } from './dmo-mode.component';

describe('DmoModeComponent', () => {
  let component: DmoModeComponent;
  let fixture: ComponentFixture<DmoModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmoModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmoModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
