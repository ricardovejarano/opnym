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

  createCountry() {
    this.country.code = this.country.name.replace(' ', '_').toLowerCase();
    this.country.flag = this.country.code + '_flag';
    this.mainService.saveCountry(this.country)
      .then(res => {
        console.log('SE CREA PAIS');
      }, err => {
        console.log('Error', err);
      });

    if (this.file) {
      this.mainService.saveCountryImage(this.file, this.country.flag);
    }

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


  fileChangeListener($event) {
    this.file = $event.target.files[0];
  }

}
