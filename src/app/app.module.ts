import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio'; 

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';

import { FormulaireComponent } from './formulaire/formulaire.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from '../shared/states/panier-state'
import { RouterModule, Routes } from '@angular/router';
import { ApiHttpInterceptor } from './api-http.interceptor';


const appRoutes : Routes = [
  {path:'',component:AccueilComponent},
  {path:'formulaire',component:FormulaireComponent},
  {path: 'produits',  loadChildren: () => import('./produit/produits.module').then(m => m.ProduitsModule)}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormulaireComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    BrowserAnimationsModule, 
    MatSliderModule,
    MatRadioModule,
    RouterModule.forRoot (appRoutes),
    NgxsModule.forRoot ([PanierState])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
