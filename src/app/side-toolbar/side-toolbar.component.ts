import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-side-toolbar',
  templateUrl: './side-toolbar.component.html',
  styleUrls: ['./side-toolbar.component.css']
})
export class SideToolbarComponent implements OnInit {

  branding = ['Nike', 'Adidas', 'Reebok' ];
  form: FormGroup;
  selectedBrands = [];
  selectedCathegory = '';
  selectedBrandsArrayValues = '';
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      men: [],
      women: [],
      kids: [],
      brands: this.addBrandControl()
    });
  }

  addBrandControl() {
    const array = this.branding.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(array);
  }

  get BrandControlArray() {
    return this.form.get('brands') as FormArray;
  }

  public  getSelectedBrands() {
    console.log('getSelectedBrands is executing');
    this.selectedBrands = [];
    this.BrandControlArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedBrands.push(this.branding[i]);
      }
    });
    this.selectedBrandsArrayValues = '';
    this.selectedBrands.forEach((brand, i) => {
      this.selectedBrandsArrayValues += '/' + brand;
    });
    console.log('selectedBrandsArrayValues are: ' + this.selectedBrandsArrayValues);
 }

 public changeSelectedCathegory(cathegory: string) {
    this.selectedCathegory = cathegory;
    console.log(this.selectedCathegory);
  }

  getSelectedCathegory() {
      return this.selectedCathegory;
  }

  onSearch() {
    this.getSelectedBrands();
    console.log(this.selectedBrands);
    const cathegory = this.getSelectedCathegory();
    console.log(cathegory);
  }

}
