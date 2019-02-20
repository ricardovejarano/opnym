import { Routes } from '@angular/router';
import { SelectNewsComponent } from './select-news.component';
import { CountrySelectedComponent } from './country-selected/country-selected.component';

export const SelectNewsRoute: Routes = [
    {
        path: 'country', component: SelectNewsComponent, children: [
            { path: ':id', component: CountrySelectedComponent }
        ]
    }
];
