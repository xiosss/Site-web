import { Component, Input, OnInit } from '@angular/core';

import {filter} from 'rxjs/operators';
import {Observable,of,from} from 'rxjs';
import { product } from '../../model/product';
import {AddReference} from '../../../shared/actions/panier.action';
import { ListproductService } from '../../service/listproduct.service';
import { Store } from '@ngxs/store';
import { PrefixNot } from '@angular/compiler';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  public product : product[] = [];
  public filterProduct : product[] = [];
  public isEmpty : boolean = false; 

  @Input() filter : String;

  constructor(public productList : ListproductService, private store : Store) { }

  ngOnInit(): void {

    this.productList.getProduct().subscribe(resultat => {
      this.product = resultat;
      this.filterProduct = resultat;
    });
  }


  recherche(filter : string){
      this.filter = filter;
      this.isEmpty = false;
      this.filterProduct = [];

      if(this.filter === ""){
        this.filterProduct = this.product;
        return;
      }

      for (let i = 0; i<this.product.length; i++){
        if (this.product[i].produit.toLowerCase().includes(this.filter.toLowerCase().trim())){
          this.filterProduct.push(this.product[i]);
        }
      }

      if(this.filterProduct.length==0){
        this.isEmpty = true;
      }

  }

  addPanier (id : number, prix : number, produit : string) {
    console.log (id);
    
    this.store.dispatch (new AddReference ({"id":id,"prix":prix,"produit":produit}));
  }


  
}
