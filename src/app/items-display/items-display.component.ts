import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-display',
  templateUrl: './items-display.component.html',
  styleUrls: ['./items-display.component.css']
})
export class ItemsDisplayComponent implements OnInit {

  products =  [
    {name: 'Nike air'}, {name: 'Adidas air'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
