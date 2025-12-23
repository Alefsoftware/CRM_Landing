import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-homeone-features',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule   // ✅ الحل هنا
    ],
    templateUrl: './homeone-features.component.html',
    styleUrls: ['./homeone-features.component.scss']
})
export class HomeoneFeaturesComponent implements OnInit {

    features: any[] = [];
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/features')
            .subscribe(res => {
                if (res?.status && res.data?.features) {
                    this.features = res.data.features;
                }
            });
    }

    getTitle(feature: any): string {
        return this.currentLang === 'ar'
            ? feature.title_ar
            : feature.title_en;
    }

    getDescription(feature: any): string {
        return this.currentLang === 'ar'
            ? feature.description_ar
            : feature.description_en;
    }
}
