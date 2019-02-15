export class NewsIntro {
    constructor($key = '',
        name = '',
        codeNews = '',
        countryCode = '',
        countryName = ''
    ) {
        this.$key = $key;
        this.name = name;
        this.codeNews = codeNews;
        this.countryCode = countryCode;
        this.countryName = countryName;
    }
    $key?: string;
    name?: string;
    codeNews?: string;
    countryCode?: string;
    countryName?: string;
}
