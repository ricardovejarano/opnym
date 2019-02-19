import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  country: Observable<Country[]>;
  user: Observable<firebase.User>;
  usersList: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
    this.country = db.collection('country').valueChanges();
    this.country.subscribe(res => {
      console.log('res', res);
    });

    // console.log('COUNTRY', this.country);
  }

  saveCountryImage(code_Country, img) {

  }
}
