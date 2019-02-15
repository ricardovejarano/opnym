import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeRoute } from './components/home/home.routing';
import { loginRoute } from './components/login/login.routing';
import { mainRoute } from './components/main/main.routing';

const appRoutes: Routes = [
    ...homeRoute,
    ...loginRoute,
    ...mainRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
