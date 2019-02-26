import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news.model';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-news-selected',
  templateUrl: './news-selected.component.html',
  styleUrls: ['./news-selected.component.css']
})
export class NewsSelectedComponent implements OnInit {

  singleNews: News = new News();
  news: News[] = [];

  constructor(public spinner: NgxSpinnerService) {
    this.initModal();
   }

  ngOnInit() {
  }

  addRegister() {
    console.log('Se agrega registro');
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
