import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { FilterproductComponent } from './filterproduct/filterproduct.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes : Routes = [
  {path:'',component:ListproductComponent},
  {path: 'detail/:id', component: DetailComponent },
]


@NgModule({
  declarations: [
    ListproductComponent,
    FilterproductComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild (appRoutes)
  ]
})
export class ProduitsModule { }
