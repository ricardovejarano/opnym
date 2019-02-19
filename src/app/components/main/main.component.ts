import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { MainService } from 'src/app/services/main.service';
declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  country: Country = new Country();
  file: File;

  constructor(public mainService: MainService) { }

  ngOnInit() {
    this.initModal();
  }

  createCountrySubmit() {
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
    this.country.codeCountry = this.country.nameCountry.replace(' ', '_').toLowerCase();
    console.log('Country code: ', this.country.codeCountry);
    this.mainService.saveCountryImage(this.country.codeCountry, this.file);
  }

  fileChangeListener($event) {
    this.file = $event.target.files[0];
  }

}
