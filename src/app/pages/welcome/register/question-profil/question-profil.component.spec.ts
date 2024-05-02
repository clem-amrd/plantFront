import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionProfilComponent } from './question-profil.component';

describe('QuestionProfilComponent', () => {
  let component: QuestionProfilComponent;
  let fixture: ComponentFixture<QuestionProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionProfilComponent]
    });
    fixture = TestBed.createComponent(QuestionProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
