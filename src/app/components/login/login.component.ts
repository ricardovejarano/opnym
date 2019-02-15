import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  email = '';
  password = '';

  constructor(public router: Router) { }

  ngOnInit() {
    this.initialiceParticles();
  }

  loginSubmit() {
    this.router.navigate(['main']);
    console.log('INICIA SESIÓN');
  }

  initialiceParticles() {
    console.log('Inicializa');
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 10,
        },
        color: {
          value: '#009688'
        },
        shape: {
          type: 'edge',
        },
        size: {
          value: 67
        }
      }
    };
  }

}
