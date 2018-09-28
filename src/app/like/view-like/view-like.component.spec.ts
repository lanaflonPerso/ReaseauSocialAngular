import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLikeComponent } from './view-like.component';

describe('ViewLikeComponent', () => {
  let component: ViewLikeComponent;
  let fixture: ComponentFixture<ViewLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
