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

  singleNews: NewsIntro = new NewsIntro();
  news: News[] = [];
  codeNews = '';

  constructor(public location: Location, public spinner: NgxSpinnerService, public newsService: NewsService) {
    this.initModal();
    this.initTooltip();
    this.codeNews = this.getURIPath();
  }

  ngOnInit() {
    this.spinner.show();
    this.getGeneralNewsInfo();
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

  addRegister() {
    console.log('Se agrega registro');
  }

  getURIPath() {
    return this.location.path().split('/')[2];
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
