import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '../../translate.service'; // adjust path

@Component({
    selector: 'app-features-style-six',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './features-style-six.component.html',
    styleUrls: [
        './features-style-six.component.scss',
    ]
})
export class FeaturesStyleSixComponent implements OnInit {
    features: any[] = [];
    featuresData: any = null;
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router,
        public translate: TranslateService
    ) {
        // detect lang from URL
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        // set <html> attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit() {
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
            .subscribe(response => {
                if (response.status && response.data.features) {
                    this.featuresData = response.data.features.details;
                    this.features = response.data.features.rows;
                }
            });
    }

    // helpers
    getTitle(data: any): string {
        return this.currentLang === 'ar' ? data?.title_ar : data?.title_en;
    }

    getDescription(data: any): string {
        return this.currentLang === 'ar' ? data?.description_ar : data?.description_en;
    }
}
