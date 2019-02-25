import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSelectedComponent } from './news-selected.component';

describe('NewsSelectedComponent', () => {
  let component: NewsSelectedComponent;
  let fixture: ComponentFixture<NewsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
