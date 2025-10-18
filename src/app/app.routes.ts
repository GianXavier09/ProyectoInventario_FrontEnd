import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListaComponent } from './dashboard/category/category-lista/category-lista.component';
import { CategoryDetalleComponent } from './dashboard/category/category-detalle/category-detalle.component';
import { BrandListaComponent } from './dashboard/brand/brand-lista/brand-lista.component';
import { BrandDetalleComponent } from './dashboard/brand/brand-detalle/brand-detalle.component';
import { ProductListaComponent } from './dashboard/product/product-lista/product-lista.component';
import { ProductDetalleComponent } from './dashboard/product/product-detalle/product-detalle.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './dashboard/home/home.component';
//import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    //{path: "login", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent,
        children:[
            {path: "home", component: HomeComponent},
            {path: "brand", component: BrandListaComponent},
            {path: "brand/:id", component: BrandDetalleComponent},
            {path: "category", component: CategoryListaComponent},
            {path: "category/:id", component: CategoryDetalleComponent},
            {path: "product", component: ProductListaComponent},
            {path: "product/:id", component: ProductDetalleComponent},
        ]
    },
    {path: "", redirectTo: "dashboard/product", pathMatch: "full"},
    {path: "**", component: PageNotFoundComponent}

];
