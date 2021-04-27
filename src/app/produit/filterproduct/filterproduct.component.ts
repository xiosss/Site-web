import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-filterproduct',
  templateUrl: './filterproduct.component.html',
  styleUrls: ['./filterproduct.component.css']
})
export class FilterproductComponent implements OnInit {

  nameFilter : string = "";
  @Output()filter : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  productFilter(filter){
    this.filter.emit(this.nameFilter);
  }

}
