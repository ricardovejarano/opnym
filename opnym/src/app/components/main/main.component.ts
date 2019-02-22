import { Component, OnInit, ElementRef } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { MainService } from 'src/app/services/main.service';
import * as firebase from 'firebase/app';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var M: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('fileimageInput') fileimageInput: ElementRef;
  @ViewChild('fileimageInput2') fileimageInput2: ElementRef;
  country: Country = new Country();
  countries: Country[] = [];
  file: File;
  fileModel = '';

  constructor(public mainService: MainService, public spinner: NgxSpinnerService,
    public router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.initModal();
    this.getCountries();
  }

  getCountries() {
    this.mainService.getCountries()
      .subscribe(res => {
        this.countries = res;
        this.spinner.hide();
        // console.log('países traídos', this.countries);
      });
  }

  createCountry() {
    if (this.file) {
      this.spinner.show();
      this.country.code = this.country.name.replace(' ', '_').toLowerCase();
      this.country.flag = this.country.code + '_flag';
      this.mainService.saveCountryImage(this.file, this.country.flag)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
          },
          (error) => {
            console.log('Ocurrió un error subiendo la imagen', error);
            M.toast({ html: 'Ocurrió un error subiendo la imagen', classes: 'red darken-4 rounded' });
            this.spinner.hide();
          },
          () => {
            console.log('SE SUBE LA IMAGEN CORRECTAMENTE');
            this.mainService.getCountryImage(this.country.flag)
              .then(res => {
                this.country.urlLink = res;
                this.mainService.saveCountry(this.country)
                  .then(res2 => {
                    console.log('SE CREA PAIS');
                    this.country = new Country();
                    this.fileimageInput.nativeElement.value = '';
                    this.fileimageInput2.nativeElement.value = '';
                    M.toast({ html: 'País creado', classes: 'teal darken-4 rounded' });
                    this.spinner.hide();
                  }, err => {
                    console.log('Error', err);
                    M.toast({ html: 'Ocurrió un error escribiendo en la base de datos', classes: 'red darken-4 rounded' });
                    this.spinner.hide();
                    this.closeModal();
                  });
              });
            this.closeModal();
          }
        );
    } else {
      M.toast({ html: 'Por favor adjunte una imagen', classes: 'red darken-4 rounded' });
    }
  }

  clickCard(country: Country) {
    this.router.navigate([`country/${country.code}`]);
  }

  createCountrySubmit() {
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


  fileChangeListener($event) {
    this.file = $event.target.files[0];
  }

}
