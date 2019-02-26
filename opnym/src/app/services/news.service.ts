import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NewsIntro } from '../models/newsIntro.model';
import { News } from '../models/news.model';

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
      countryName: news.countryName,
      isDirect: news.isDirect
    });
  }

  createNewRegister(codeNews, registerNews: News) {
    const docRef = this.db.collection(`news`).doc(codeNews).collection('register');
    return docRef.add({
      dateNews: registerNews.dateNews,
      hourNews: registerNews.hourNews,
      actual: registerNews.actual,
      fcast: registerNews.fcast,
      rev: registerNews.rev,
      prior: registerNews.prior,
      desv: registerNews.desv,
      direction: registerNews.direction,
      strong: registerNews.strong,
      annotation: registerNews.annotation,
      success: registerNews.success
    });
  }

  getNewsRecords(codeNews) {
    return this.db.collection('news').doc(codeNews).collection('register', ref =>
      ref.orderBy('dateNews')).valueChanges();
  }

  getNewsRegister(codeCountry) {
    return this.db.collection(`news`, ref =>
      ref.where('countryCode', '==', codeCountry)).valueChanges();
  }

  getGeneralInfo(codeNews) {
    return this.db.collection('news').doc(codeNews).get();
  }

}
