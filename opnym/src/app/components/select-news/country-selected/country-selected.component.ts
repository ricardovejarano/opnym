import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { Country } from 'src/app/models/country.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsIntro } from 'src/app/models/newsIntro.model';
import { NewsService } from 'src/app/services/news.service';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-country-selected',
  templateUrl: './country-selected.component.html',
  styleUrls: ['./country-selected.component.css']
})
export class CountrySelectedComponent implements OnInit {
  country: Country = new Country();
  countries: Country[] = [];
  news: NewsIntro = new NewsIntro();
  newsRegistred: NewsIntro[] = [];
  codeCountrySelected = '';
  flagChage = false;

  constructor(public location: Location, public mainService: MainService,
    public router: Router, public spinner: NgxSpinnerService, public newsService: NewsService) {
    this.initModal();
    this.country.name = 'País';
  }

  ngOnInit() {
    this.spinner.show();
    this.getCountries();
    this.initSelector();
    this.getCountrySelected();
    this.getRegistredNews();
  }

  createNews() {
    this.spinner.show();
    this.news.codeNews = this.mainService.getCodeFromName(this.news.name);
    this.news.countryCode = this.country.code;
    this.news.countryName = this.country.name;
    this.newsService.createNews(this.news)
      .then(res => {
        console.log('Succes data pushed from new News');
        M.toast({ html: 'Noticia creada', classes: 'teal darken-4 rounded' });
        this.closeModal();
        this.spinner.hide();
      }, err => {
        console.log('Error pushing news data', err);
        this.spinner.hide();
        M.toast({ html: 'Ocurrió un error guardando la noticia', classes: 'red darken-4 rounded' });
      });
  }

  getRegistredNews() {
    this.newsService.getNewsRegister()
    .subscribe(res => {
      this.newsRegistred = res;
      this.spinner.hide();
      console.log('Lista de noticias: ', this.newsRegistred);
    }, err => {
      console.log('Error al traer los datos', err);
      this.spinner.hide();
      M.toast({ html: 'Ocurrió un error guardando la noticia' + err , classes: 'red darken-4 rounded' });
    });
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
