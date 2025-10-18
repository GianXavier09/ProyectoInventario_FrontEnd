import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandDetalleComponent } from './brand-detalle.component';

describe('BrandDetalleComponent', () => {
  let component: BrandDetalleComponent;
  let fixture: ComponentFixture<BrandDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
