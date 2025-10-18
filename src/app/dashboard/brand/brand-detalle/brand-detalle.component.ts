import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { BrandCreateRequest } from '../../../model/BrandCreateRequest';
import { Brand } from '../brand';
import { FormsModule } from '@angular/forms';

enum FormType {
  Crear = 0,
  Actualizar = 1
}

@Component({
  selector: 'app-brand-detalle',
  imports: [FormsModule],
  templateUrl: './brand-detalle.component.html',
  styleUrl: './brand-detalle.component.css'
})
export class BrandDetalleComponent {

  brandId: string | null = ""
  marcaNombre: string = ""
  email: string = ""
  homepage: string=""
  titulo: string = ""
  formType! : FormType 

  constructor(private route: ActivatedRoute,
    private brandService: BrandService,
    private router: Router){
  }

  ngOnInit(){
    this.brandId = this.route.snapshot.paramMap.get("id")
    if(this.brandId !== 'nuevo'){
      this.titulo = "Editar Marca"
      this.formType = FormType.Actualizar
      this.getBrandById(Number(this.brandId))
    }else{
      this.titulo = "Registrar Marca"
      this.formType = FormType.Crear
      this.brandId = ""
    }
  }

  getBrandById(id: number){
    this.brandService.getBrandById(id)
    .subscribe({
      next: (response) => {
        this.marcaNombre = response.marcanombre
        this.email = response.email
        this.homepage = response.homepage
      }, error: (err) =>{
        console.error(err)
      }
    })
  }

  registerBrand(){
    console.log("AQUII")
    if(this.formType === FormType.Crear){
      const newBrand: BrandCreateRequest = {
        marcanombre: this.marcaNombre,
        email: this.email,
        homepage: this.homepage
      }
      this.brandService.createBrand(newBrand).subscribe(
        {
          next:(response) =>{
            console.log(response)
            this.router.navigate(['/dashboard/brand']);
          },
          error:(err) => {
            console.error(err)
          }
        })
    }else{
      const newBrand: Brand = {
        brandid: Number(this.brandId),
        marcanombre: this.marcaNombre,
        email: this.email,
        homepage: this.homepage
      }
      this.brandService.updateBrand(newBrand).subscribe(
        {
          next:(response) =>{
            console.log(response)
            this.router.navigate(['/dashboard/brand']);
          },
          error:(err) => {
            console.error(err)
          }
        }
      )
    }
  }



  
}
