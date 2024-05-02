import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPotagerComponent } from './question-potager.component';

describe('QuestionPotagerComponent', () => {
  let component: QuestionPotagerComponent;
  let fixture: ComponentFixture<QuestionPotagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionPotagerComponent]
    });
    fixture = TestBed.createComponent(QuestionPotagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
