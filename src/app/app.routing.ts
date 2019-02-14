import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homeRoute } from './components/home/home.routing';
import { loginRoute } from './components/login/login.routing';

const appRoutes: Routes = [
    ...homeRoute,
    ...loginRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
