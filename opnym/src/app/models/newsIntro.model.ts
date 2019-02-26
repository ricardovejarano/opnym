export class NewsIntro {
    constructor($key = '',
        name = '',
        codeNews = '',
        countryCode = '',
        countryName = '',
        isDirect = false
    ) {
        this.$key = $key;
        this.name = name;
        this.codeNews = codeNews;
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.isDirect = isDirect;
    }
    $key?: string;
    name?: string;
    codeNews?: string;
    countryCode?: string;
    countryName?: string;
    isDirect?: boolean;
}
