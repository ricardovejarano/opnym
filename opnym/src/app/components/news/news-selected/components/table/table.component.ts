import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news.model';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // GALERRY
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

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
    this.initGalery();
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

  initGalery() {
    this.galleryOptions = [
      {
          width: '800px',
          height: '600px',
          thumbnailsColumns: 3,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: 'https://lorempixel.com/250/250/nature/1',
          medium: 'https://lorempixel.com/250/250/nature/1',
          big: 'https://lorempixel.com/250/250/nature/1'
      },
      {
          small: 'https://lorempixel.com/250/250/nature/2',
          medium: 'https://lorempixel.com/250/250/nature/2',
          big: 'https://lorempixel.com/250/250/nature/2'
      },
      {
          small: 'https://lorempixel.com/250/250/nature/3',
          medium: 'https://lorempixel.com/250/250/nature/3',
          big: 'https://lorempixel.com/250/250/nature/3'
      }
  ];
  }

}
