import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.inicialiceParallax();
    this.inicialiceSlide();
  }

  inicialiceParallax() {
    jQuery(document).ready(function () {
      jQuery('.parallax').parallax();
    });
  }

  inicialiceSlide() {
    jQuery(document).ready(function () {
      jQuery('.slider').slider();
    });
  }
}
