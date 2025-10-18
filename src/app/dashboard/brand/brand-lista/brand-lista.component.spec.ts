import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandListaComponent } from './brand-lista.component';

describe('BrandListaComponent', () => {
  let component: BrandListaComponent;
  let fixture: ComponentFixture<BrandListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
