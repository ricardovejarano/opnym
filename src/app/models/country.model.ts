import { NewsIntro } from './newsIntro.model';

export class Country {
    constructor($key = '',
        name = '',
        code = '',
        flag = '',
        news = [],
    ) {
        this.$key = $key;
        this.name = name;
        this.code = code;
        this.flag = flag;
        this.news = news;
    }
    $key?: string;
    name?: string;
    code?: string;
    flag?: string;
    news?: NewsIntro[];
}
