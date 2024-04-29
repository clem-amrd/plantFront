import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPageComponent } from './cat-page.component';

describe('CatPageComponent', () => {
  let component: CatPageComponent;
  let fixture: ComponentFixture<CatPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatPageComponent]
    });
    fixture = TestBed.createComponent(CatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
