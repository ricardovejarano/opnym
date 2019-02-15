export class News {
    constructor($key = '',
        dateNews = '',
        hourNews = '',
        actual = 0,
        fcast = 0,
        rev = 0,
        prior = 0,
        desv = 0,
    ) {
        this.$key = $key;
        this.dateNews = dateNews;
        this.hourNews = hourNews;
        this.actual = actual;
        this.fcast = fcast;
        this.rev = rev;
        this.prior = prior;
        this.desv = desv;
    }
    $key?: string;
    dateNews?: string;
    hourNews?: string;
    actual?: number;
    fcast?: number;
    rev?: number;
    prior?: number;
    desv?: number;
}
