import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLocationComponent } from './api-location.component';

describe('ApiLocationComponent', () => {
  let component: ApiLocationComponent;
  let fixture: ComponentFixture<ApiLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
