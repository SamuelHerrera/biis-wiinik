import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTheRoadComponent } from './on-the-road.component';

describe('OnTheRoadComponent', () => {
  let component: OnTheRoadComponent;
  let fixture: ComponentFixture<OnTheRoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTheRoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTheRoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
