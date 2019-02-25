import { Routes } from '@angular/router';
import { SelectNewsComponent } from './select-news.component';
import { CountrySelectedComponent } from './country-selected/country-selected.component';
import { SingleNewsComponent } from './single-news/single-news.component';


export const SelectNewsRoute: Routes = [
    {
        path: 'country', component: SelectNewsComponent, children: [
            { path: ':id', component: CountrySelectedComponent, children: [
                {path: 'es', component: SingleNewsComponent}
            ] }
        ]
    }
];
