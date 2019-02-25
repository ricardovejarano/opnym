import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { ParticlesModule } from 'angular-particle';
import { MainComponent } from './components/main/main.component';
import { environment } from 'src/environments/environment';
import { MainService } from './services/main.service';
import { FirebaseConfig } from 'src/firebase.config';
import { SelectNewsComponent } from './components/select-news/select-news.component';
import { CountrySelectedComponent } from './components/select-news/country-selected/country-selected.component';
import { NewsService } from './services/news.service';
import { NewsComponent } from './components/news/news.component';
import { NewsSelectedComponent } from './components/news/news-selected/news-selected.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    SelectNewsComponent,
    CountrySelectedComponent,
    NewsComponent,
    NewsSelectedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ParticlesModule,
    AngularFireModule.initializeApp(FirebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxSpinnerModule
  ],
  providers: [MainService,
    NewsService, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
