import { NewsIntro } from './newsIntro.model';

export class Country {
    constructor($key = '',
        nameCountry = '',
        codeCountry = '',
        news = [],
    ) {
        this.$key = $key;
        this.nameCountry = nameCountry;
        this.codeCountry = codeCountry;
        this.news = news;
    }
    $key?: string;
    nameCountry?: string;
    codeCountry?: string;
    news?: NewsIntro[];
}
