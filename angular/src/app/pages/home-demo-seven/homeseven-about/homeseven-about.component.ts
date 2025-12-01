import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '../../../translate.service'; // adjust path if needed

@Component({
    selector: 'app-homeseven-about',
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterModule], // ✅ added RouterModule
    templateUrl: './homeseven-about.component.html',
    styleUrls: [
        './homeseven-about.component.en.scss',
        './homeseven-about.component.ar.scss',
    ]
})
export class HomesevenAboutComponent implements OnInit {
    aboutData: any = null;
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router,
        public translate: TranslateService
    ) {
        // Detect language from URL
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        // Set HTML attributes for RTL/LTR
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.http.get('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
            .subscribe((res: any) => {
                if (res.status && res.data.about) {
                    this.aboutData = res.data.about;
                }
            });
    }

    get aboutItems(): any[] {
        return this.aboutData?.items ? Object.values(this.aboutData.items) : [];
    }

    // 🔹 Helpers for localization
    getTitle(details: any): string {
        return this.currentLang === 'ar' ? details?.title_ar : details?.title_en;
    }

    getDescription(details: any): string {
        return this.currentLang === 'ar' ? details?.description_ar : details?.description_en;
    }

    getItemTitle(item: any): string {
        return this.currentLang === 'ar' ? item?.title_ar : item?.title_en;
    }

    getItemDescription(item: any): string {
        return this.currentLang === 'ar' ? item?.description_ar : item?.description_en;
    }

    // 🔹 Navigate to sign-up
    goToSignUp(): void {
        this.router.navigate([`/${this.currentLang}/sign-up`]);
    }
}
