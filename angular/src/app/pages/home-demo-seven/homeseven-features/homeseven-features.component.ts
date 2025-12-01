import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '../../../translate.service'; // adjust path

@Component({
    selector: 'app-homeseven-features',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './homeseven-features.component.html',
    styleUrls: [
        './homeseven-features.component.scss',
    ]
})
export class HomesevenFeaturesComponent implements OnInit {
    services: any[] = [];
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

        // set html attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site').subscribe({
            next: (res) => {
                if (res.status && res.data?.services) {
                    this.services = res.data.services.rows;
                }
            },
            error: (err) => {
                console.error('Failed to load services:', err);
            }
        });
    }

    // helper to return localized field
    getTitle(service: any): string {
        return this.currentLang === 'ar' ? service.title_ar : service.title_en;
    }

    getDescription(service: any): string {
        return this.currentLang === 'ar' ? service.description_ar : service.description_en;
    }
}
