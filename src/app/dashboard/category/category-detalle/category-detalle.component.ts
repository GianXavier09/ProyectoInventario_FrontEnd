import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { CategoryCreateRequest } from '../../../model/CategoryCreateRequest';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';

enum FormType {
  Crear = 0,
  Actualizar = 1
}

@Component({
  selector: 'app-category-detalle',
  imports: [FormsModule],
  templateUrl: './category-detalle.component.html',
  styleUrl: './category-detalle.component.css'
})
export class CategoryDetalleComponent {

  categoryId: string | null = ""
  categoryName: string = ""
  description: string = ""
  titulo: string =""
  formType! : FormType

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router){
  }

  ngOnInit(){
    this.categoryId = this.route.snapshot.paramMap.get("id")
    if(this.categoryId !== 'nuevo'){
      this.titulo = "Editar Categoria"
      this.formType = FormType.Actualizar
      this.getCategoryById(Number(this.categoryId))
    }else{
      this.titulo = "Registrar Categoria"
      this.formType = FormType.Crear
      this.categoryId = ""
    }
  }

  getCategoryById(id: number){
    this.categoryService.getCategoryById(id)
    .subscribe({
      next: (response) => {
        this.categoryName = response.categoryname
        this.description = response.description
      }, error: (err) => {
        console.error(err)
      }
    })
  }

  registerCategory(){
    console.log("AQUII")
    if(this.formType === FormType.Crear){
      const newCategory: CategoryCreateRequest = {
        categoryname: this.categoryName,
        description: this.description
      }
      this.categoryService.createCategory(newCategory).subscribe(
        {
          next:(response) =>{
            console.log(response)
            this.router.navigate(['/dashboard/category'])
          },
          error:(err) => {
            console.error(err)
          }
        })
    }else{
      const newCategory: Category = {
        categoryid: Number(this.categoryId),
        categoryname: this.categoryName,
        description: this.description
      }
      this.categoryService.updateCategory(newCategory).subscribe(
        {
          next:(response) =>{
            console.log(response)
            this.router.navigate(['/dashboard/category']);
          },
          error:(err) => {
            console.error(err)
          }
        }
      )
    }
  }
}
