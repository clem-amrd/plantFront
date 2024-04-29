import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInformationsComponent } from './my-informations.component';

describe('MyInformationsComponent', () => {
  let component: MyInformationsComponent;
  let fixture: ComponentFixture<MyInformationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInformationsComponent]
    });
    fixture = TestBed.createComponent(MyInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
