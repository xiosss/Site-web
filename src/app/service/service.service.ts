import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {product}from '../model/product'


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient : HttpClient) { 
    
  }


  public getProduct () : Observable<product[]> {
    return this.httpClient.get<product[]> (environment.baseUrl);
  }

}