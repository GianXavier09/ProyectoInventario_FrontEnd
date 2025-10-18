import { Component } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-lista',
  imports: [],
  templateUrl: './category-lista.component.html',
  styleUrl: './category-lista.component.css'
})
export class CategoryListaComponent {

  categorias: Category[] = []

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router){
  }
  ngOnInit() {
    this.categoryService.getAllCategory().subscribe({
      next:(response) => {
        this.categorias = response
      },error: (err) => {
        console.error(err)
      }
    })
  }

  onNavigateEditCategory(categoryId: number){
    this.router.navigate([categoryId], {relativeTo: this.route})
  }
  onNavigateCreateCategory(){
    this.router.navigate(['nuevo'], {relativeTo: this.route})
  }

}
