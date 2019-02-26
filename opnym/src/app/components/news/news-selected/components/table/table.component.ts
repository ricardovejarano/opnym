import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  recordsNews: News[] = [];
  codeNews = '';
  arrayYearsFilter = [];

  constructor(public newsService: NewsService, public location: Location) {
    this.codeNews = this.getURIPath();
    this.initArrayFilter();
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

  getURIPath() {
    return this.location.path().split('/')[2];
  }

  initArrayFilter() {
    for (let x = 2010; x < 2021; x++) {
      this.arrayYearsFilter.push(x);
    }
  }

}
