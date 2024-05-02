import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPlanteComponent } from './question-plante.component';

describe('QuestionPlanteComponent', () => {
  let component: QuestionPlanteComponent;
  let fixture: ComponentFixture<QuestionPlanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionPlanteComponent]
    });
    fixture = TestBed.createComponent(QuestionPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
