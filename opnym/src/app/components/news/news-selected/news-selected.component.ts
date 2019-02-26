import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { News } from 'src/app/models/news.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewsService } from 'src/app/services/news.service';
import { NewsIntro } from 'src/app/models/newsIntro.model';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-news-selected',
  templateUrl: './news-selected.component.html',
  styleUrls: ['./news-selected.component.css']
})
export class NewsSelectedComponent implements OnInit {

  newsRegister: News = new News();
  singleNews: NewsIntro = new NewsIntro();
  news: News[] = [];
  codeNews = '';

  constructor(public location: Location, public spinner: NgxSpinnerService,
    public newsService: NewsService) {
    this.initModal();
    this.initTooltip();
    this.initDatePicker();
    this.initSelector();
    this.codeNews = this.getURIPath();
  }

  ngOnInit() {
    this.spinner.show();
    this.getGeneralNewsInfo();
  }

  evaluateRegister() {
    if (this.newsRegister.fcast === null && this.newsRegister.prior === null && this.newsRegister
      .rev === null) {
      M.toast({ html: 'Fcast, Prior y Rev están vacíos', classes: 'red darken-4 rounded' });
    } else {
      this.spinner.show();
      this.getDesviation();
    }
  }

  getDesviation() {
    if (this.newsRegister.fcast !== null) {
      this.newsRegister.desv = this.newsRegister.actual - this.newsRegister.fcast;
    } else if (this.newsRegister.rev !== null) {
      this.newsRegister.desv = this.newsRegister.actual - this.newsRegister.rev;
    } else if (this.newsRegister.prior !== null) {
      this.newsRegister.desv = this.newsRegister.actual - this.newsRegister.prior;
    }
    this.newsRegister.desv = Number(this.newsRegister.desv.toFixed(2));
    this.addRegister();
  }

  addRegister() {
    console.log('Variable newsRegister', this.newsRegister);
    this.newsService.createNewRegister(this.codeNews, this.newsRegister)
      .then(res => {
        this.spinner.hide();
        M.toast({ html: 'Noticia creada', classes: 'teal darken-4 rounded' });
        this.newsRegister = new News();
      }, err => {
        this.spinner.hide();
        M.toast({ html: 'Error al crear noticia', classes: 'red darken-4 rounded' });
        console.log('Error', err);
      });
  }

  getGeneralNewsInfo() {
    this.newsService.getGeneralInfo(this.codeNews)
      .subscribe(doc => {
        if (!doc.exists) {
          console.log('El documento no existe');
        } else {
          this.singleNews = new NewsIntro();
          this.singleNews = doc.data();
          this.spinner.hide();
          // console.log('Información de la noticia', this.singleNews);
        }
      }, err => {
        console.log('Error getting document', err);
      });
  }

  getURIPath() {
    return this.location.path().split('/')[2];
  }

  initSelector() {
    jQuery(document).ready(function () {
      jQuery('select').formSelect();
    });
  }

  initDatePicker() {
    jQuery(document).ready(function () {
      jQuery('.datepicker').datepicker();
    });
  }

  initModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal();
    });
  }

  initTooltip() {
    jQuery(document).ready(function () {
      jQuery('.tooltipped').tooltip();
    });
  }

  closeModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal('close');
    });
  }

}
