import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCatsComponent } from './my-cats.component';

describe('MyCatsComponent', () => {
  let component: MyCatsComponent;
  let fixture: ComponentFixture<MyCatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCatsComponent]
    });
    fixture = TestBed.createComponent(MyCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
