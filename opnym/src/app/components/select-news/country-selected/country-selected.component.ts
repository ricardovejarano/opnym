import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { Country } from 'src/app/models/country.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsIntro } from 'src/app/models/newsIntro.model';
declare var jQuery: any;

@Component({
  selector: 'app-country-selected',
  templateUrl: './country-selected.component.html',
  styleUrls: ['./country-selected.component.css']
})
export class CountrySelectedComponent implements OnInit {
  country: Country = new Country();
  countries: Country[] = [];
  news: NewsIntro = new NewsIntro();
  codeCountrySelected = '';
  flagChage = false;

  constructor(public location: Location, public mainService: MainService,
    public router: Router, public spinner: NgxSpinnerService) {
      this.initModal();
      this.country.name = 'País';
     }

  ngOnInit() {
    this.getCountries();
    this.initSelector();
    this.getCountrySelected();
  }

  createNews() {
    this.news.codeNews = this.mainService.getCodeFromName(this.news.name);
    console.log('News name: ' + this.news.name, 'News code: ' + this.news.codeNews, 'Country name: ' + this.country.name,
    'Country code: ' + this.country.code );
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
          // console.log(this.country);
          this.flagChage = true;
          setTimeout(() => {
            this.flagChage = false;
            this.spinner.hide();
          }, 100);
        }
      }, err => {
        console.log('Error getting document', err);
      });
  }

  onChangeSelect(event) {
    this.spinner.show();
    this.router.navigate([`country/${event}`]);
    setTimeout(() => {
      this.getCountrySelected();
    }, 200);
  }


  initSelector() {
    setTimeout(() => {
      // Delay to show selector in actual render
      jQuery(document).ready(function () {
        jQuery('select').formSelect();
      });
    }, 100);
  }

  initModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal();
    });
  }

  closeModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal('close');
    });
  }



}
