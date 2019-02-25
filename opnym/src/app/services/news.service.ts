import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NewsIntro } from '../models/newsIntro.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public db: AngularFirestore) { }

  createNews(news: NewsIntro) {
    const docRef = this.db.collection(`news`).doc(news.codeNews);
    return docRef.set({
      name: news.name,
      codeNews: news.codeNews,
      countryCode: news.countryCode,
      countryName: news.countryName
    });
  }

  getNewsRegister(codeCountry) {
    console.log('Codigo de pais en servicio: ' + codeCountry);
    return this.db.collection(`news`, ref =>
      ref.where('countryCode', '==', codeCountry)).valueChanges();
  }

}
