import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotosComponent } from './edit-photos.component';

describe('EditPhotosComponent', () => {
  let component: EditPhotosComponent;
  let fixture: ComponentFixture<EditPhotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPhotosComponent]
    });
    fixture = TestBed.createComponent(EditPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
