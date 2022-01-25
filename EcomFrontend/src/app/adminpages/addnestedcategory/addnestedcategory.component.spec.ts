import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnestedcategoryComponent } from './addnestedcategory.component';

describe('AddnestedcategoryComponent', () => {
  let component: AddnestedcategoryComponent;
  let fixture: ComponentFixture<AddnestedcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnestedcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnestedcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
