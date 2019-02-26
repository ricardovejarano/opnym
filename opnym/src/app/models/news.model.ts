export class News {
    constructor($key = '',
        dateNews = '',
        hourNews = '',
        actual = null,
        fcast = null,
        rev = null,
        prior = null,
        desv = null,
        direction = '',
        strong= null,
        success = '',
        annotation = ''
    ) {
        this.$key = $key;
        this.dateNews = dateNews;
        this.hourNews = hourNews;
        this.actual = actual;
        this.fcast = fcast;
        this.rev = rev;
        this.prior = prior;
        this.desv = desv;
        this.direction = direction;
        this.strong = strong;
        this.success = success;
        this.annotation = annotation;
    }
    $key?: string;
    dateNews?: string;
    hourNews?: string;
    actual?: number;
    fcast?: number;
    rev?: number;
    prior?: number;
    desv?: number;
    direction?: string;
    strong?: number;
    success?: string;
    annotation?: string;
}
