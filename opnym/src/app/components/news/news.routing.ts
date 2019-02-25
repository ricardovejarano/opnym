import { Routes } from '@angular/router';
import { NewsSelectedComponent } from './news-selected/news-selected.component';
import { NewsComponent } from './news.component';

export const NewsRoute: Routes = [
    {
        path: 'news', component: NewsComponent, children: [
            { path: ':id', component: NewsSelectedComponent }
        ]
    }
];
