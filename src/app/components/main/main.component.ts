import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  country: Country = new Country();

  constructor() { }

  ngOnInit() {
    this.initModal();
  }

  createCountrySubmit() {
    console.log('Se crea Pais');
  }

  initModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal();
    });
  }

  closeModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal().close();
    });
  }

  createCountry() {
    console.log('Crear Pais');
  }

}
