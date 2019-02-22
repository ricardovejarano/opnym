import { NewsIntro } from './newsIntro.model';

export class Country {
    constructor($key = '',
        name = '',
        code = '',
        flag = '',
        news = [],
        urlLink = ''
    ) {
        this.$key = $key;
        this.name = name;
        this.code = code;
        this.flag = flag;
        this.news = news;
        this.urlLink = urlLink;
    }
    $key?: string;
    name?: string;
    code?: string;
    flag?: string;
    news?: NewsIntro[];
    urlLink?: string;
}
