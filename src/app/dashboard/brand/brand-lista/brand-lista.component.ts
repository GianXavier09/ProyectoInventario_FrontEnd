import { Component } from '@angular/core';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-lista',
  imports: [],
  templateUrl: './brand-lista.component.html',
  styleUrl: './brand-lista.component.css'
})
export class BrandListaComponent {

  brands: Brand[] = []

  constructor(private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router){
    }
  ngOnInit(){
    this.brandService.getAllBrand().subscribe({
      next:(response) => {
        this.brands = response
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  onNavigateEditBrand(brandId: number){
    this.router.navigate([brandId], {relativeTo: this.route})
  }
  
  onNavigateCreateBrand(){
    this.router.navigate(['nuevo'], {relativeTo: this.route})
  }


}
