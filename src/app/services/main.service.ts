import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  country2: Observable<Country[]>;
  user: Observable<firebase.User>;
  usersList: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore,
    private afStorage: AngularFireStorage) {
    this.country2 = db.collection('country').valueChanges();
    this.country2.subscribe(res => {
      console.log('res', res);
    });
  }

  saveCountryImage(image, flagCountry) {
    const storageRef = firebase.storage().ref();
    return storageRef.child(`country_flag/${flagCountry}`).put(image);
  }

  saveCountry(country: Country) {
    const docRef = this.db.collection('country').doc(country.code);
    return docRef.set({
      name: country.name,
      code: country.code,
      flag: country.flag
    });

  }
}
