import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListaComponent } from './product-lista.component';

describe('ProductListaComponent', () => {
  let component: ProductListaComponent;
  let fixture: ComponentFixture<ProductListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
