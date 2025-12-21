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
    sectionDetails: any = null; // <-- add this
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router,
        public translate: TranslateService
    ) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site').subscribe({
            next: (res) => {
                if (res.status && res.data) {
                    this.services = res.data.rows || [];
                    this.sectionDetails = res.data.details || null; // <-- assign details
                }
            },
            error: (err) => {
                console.error('Failed to load services:', err);
            }
        });
    }

    getTitle(item: any): string {
        return this.currentLang === 'ar' ? item.title_ar : item.title_en;
    }

    getDescription(item: any): string {
        return this.currentLang === 'ar' ? item.description_ar : item.description_en;
    }
}

