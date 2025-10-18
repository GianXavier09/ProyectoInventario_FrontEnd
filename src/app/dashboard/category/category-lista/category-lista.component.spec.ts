import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListaComponent } from './category-lista.component';

describe('CategoryListaComponent', () => {
  let component: CategoryListaComponent;
  let fixture: ComponentFixture<CategoryListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
