import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseWiseScoreComponent } from './clause-wise-score.component';

describe('ClauseWiseScoreComponent', () => {
  let component: ClauseWiseScoreComponent;
  let fixture: ComponentFixture<ClauseWiseScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClauseWiseScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseWiseScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
