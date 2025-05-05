import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBooklistComponent } from './category-booklist.component';

describe('CategoryBooklistComponent', () => {
  let component: CategoryBooklistComponent;
  let fixture: ComponentFixture<CategoryBooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBooklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
