import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListHttpComponent } from './customer-list-http.component';

describe('CustomerListHttpComponent', () => {
  let component: CustomerListHttpComponent;
  let fixture: ComponentFixture<CustomerListHttpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListHttpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
