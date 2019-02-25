import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeRoute } from './components/home/home.routing';
import { loginRoute } from './components/login/login.routing';
import { mainRoute } from './components/main/main.routing';
import { SelectNewsRoute } from './components/select-news/select-news.routing';
import { NewsRoute } from './components/news/news.routing';

const appRoutes: Routes = [
    ...homeRoute,
    ...loginRoute,
    ...mainRoute,
    ...SelectNewsRoute,
    ...NewsRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
