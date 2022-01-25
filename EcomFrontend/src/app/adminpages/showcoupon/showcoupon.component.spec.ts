import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcouponComponent } from './showcoupon.component';

describe('ShowcouponComponent', () => {
  let component: ShowcouponComponent;
  let fixture: ComponentFixture<ShowcouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
