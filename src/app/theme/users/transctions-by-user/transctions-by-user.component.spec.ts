import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransctionsByUserComponent } from './transctions-by-user.component';

describe('TransctionsByUserComponent', () => {
  let component: TransctionsByUserComponent;
  let fixture: ComponentFixture<TransctionsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransctionsByUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransctionsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
