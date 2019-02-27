import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news.model';
import { Location } from '@angular/common';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  editableNews: News = new News();
  recordsNews: News[] = [];
  codeNews = '';
  arrayYearsFilter = [];

  constructor(public newsService: NewsService, public location: Location) {
    this.codeNews = this.getURIPath();
    this.initArrayFilter();
    this.initModal();
    this.initCarousel();
    this.initCollapsable();
  }

  ngOnInit() {
    this.getRecordsNews();
  }

  onChangeSelect(year) {
    this.recordsNews = [];
    const codeFiltredNews = year + '-01-01';
    this.newsService.getNewsFiltredRecords(this.codeNews, codeFiltredNews)
      .subscribe(res => {
        this.recordsNews = res;
        console.log(this.recordsNews);
      }, err => {
        console.log('Error trayendo datos', err);
      });
  }

  getRecordsNews() {
    this.newsService.getNewsRecords(this.codeNews)
      .subscribe(res => {
        this.recordsNews = res;
        console.log(this.recordsNews);
      }, err => {
        console.log('Error trayendo datos', err);
      });
  }

  rowClick(event: News) {
    this.editableNews = event;
    // window.alert(event.dateNews);
  }

  getURIPath() {
    return this.location.path().split('/')[2];
  }

  initArrayFilter() {
    for (let x = 2010; x < 2021; x++) {
      this.arrayYearsFilter.push(x);
    }
  }

  initModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal();

    });
  }

  initCarousel() {
    jQuery(document).ready(function () {
      jQuery('.carousel').carousel();
    });

  }


  initCollapsable() {
    jQuery(document).ready(function () {
      jQuery('.collapsible').collapsible();
    });
  }

  closeModal() {
    jQuery(document).ready(function () {
      jQuery('.modal').modal('close');
    });
  }

}
