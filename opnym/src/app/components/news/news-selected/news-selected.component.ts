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

  yearFilter = '';
  codeNews = '';
  impact = '';

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
    this.getSuccess();
  }

  getSuccess() {
    let directRelation = false;

    if (this.newsRegister.desv > 0 && this.newsRegister.direction === 'alcista') {
      directRelation = true;
    } else if (this.newsRegister.desv < 0 && this.newsRegister.direction === 'bajista') {
      directRelation = true;
    } else if (this.newsRegister.desv === 0) {
      this.newsRegister.success = 'no_trade';
    } else {
      directRelation = false;
    }

    if (this.newsRegister.success !== 'no_trade') {
      switch (directRelation) {
        case true: {
          if (this.singleNews.isDirect === 'true') {
            this.newsRegister.success = 'exito';
          } else {
            this.newsRegister.success = 'fallo';
          }
          break;
        }
        case false: {
          if (this.singleNews.isDirect === 'true') {
            this.newsRegister.success = 'fallo';
          } else {
            this.newsRegister.success = 'exito';
          }
          break;
        }
      }
    }
    // window.alert('Resultado de la noticia: ' + this.newsRegister.success);
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
        this.newsRegister = new News();
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
          if (this.singleNews.isDirect === 'true') {
            this.impact = 'Directo';
          } else {
            this.impact = 'Inverso';
          }
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
