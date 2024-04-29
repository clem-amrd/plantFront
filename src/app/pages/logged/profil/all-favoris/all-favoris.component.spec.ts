import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFavorisComponent } from './all-favoris.component';

describe('AllFavorisComponent', () => {
  let component: AllFavorisComponent;
  let fixture: ComponentFixture<AllFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFavorisComponent]
    });
    fixture = TestBed.createComponent(AllFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
