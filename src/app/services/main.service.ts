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

    // console.log('COUNTRY', this.country);
  }

  saveCountryImage(image, flagCountry) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`country_flag/${flagCountry}`).put(image);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        console.log('SE SUBE LA IMAGEN');
      }
    );

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
