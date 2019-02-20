import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { Country } from 'src/app/models/country.model';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-country-selected',
  templateUrl: './country-selected.component.html',
  styleUrls: ['./country-selected.component.css']
})
export class CountrySelectedComponent implements OnInit {
  country: Country = new Country();
  countries: Country[] = [];
  codeCountrySelected = '';
  flagChage = false;

  constructor(public location: Location, public mainService: MainService,
    public router: Router) { }

  ngOnInit() {
    this.getCountries();
    this.initSelector();
    this.getCountrySelected();
  }

  getCountries() {
    this.mainService.getCountries()
      .subscribe(res => {
        this.countries = res;
        // console.log('Paises en componente', this.countries);
      }, err => {
        console.log('Se produjo un error en country-selected getCountries()', err);
      });
  }

  getCountrySelected() {
    this.codeCountrySelected = this.location.path().split('/')[2];
    this.mainService.getCountry(this.codeCountrySelected)
      .subscribe(doc => {
        if (!doc.exists) {
          console.log('El documento no existe');
        } else {
          this.country = new Country();
          this.country = doc.data();
          console.log(this.country);
          this.flagChage = true;
          setTimeout(() => {
            this.flagChage = false;
          }, 100);
          // console.log('Document data:', doc.data());
        }
      }, err => {
        console.log('Error getting document', err);
      });
  }

  onChangeSelect(event) {
    this.router.navigate([`country/${event}`]);
    setTimeout(() => {
      this.getCountrySelected();
    }, 200);
  }


  initSelector() {
    setTimeout(() => {
      jQuery(document).ready(function () {
        jQuery('select').formSelect();
      });
    }, 100);

  }

}
