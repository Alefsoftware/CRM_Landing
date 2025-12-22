import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TranslateService } from '../../translate.service';

import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-privacy-policy-page',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterLink,
        NavbarStyleTwoComponent,
        DownloadAppStyleTwoComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './privacy-policy-page.component.html',
    styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent implements OnInit {

    // 🌍 Language
    currentLang: 'en' | 'ar' = 'en';

    // 📄 Content
    title = '';
    content!: SafeHtml;

    // 🔄 States
    loading = false;
    errorMessage = '';

    constructor(
        private http: HttpClient,
        private router: Router,
        private sanitizer: DomSanitizer,
        public translate: TranslateService
    ) {
        // 🔹 Detect language from URL (/en or /ar)
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

        // 🔹 Switch language
        this.translate.switchLang(this.currentLang);

        // 🔹 Set HTML attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.getPrivacyPolicy();
    }

    // ==============================
    // 📡 API CALL
    // ==============================
    getPrivacyPolicy(): void {
        this.loading = true;
        this.errorMessage = '';

        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/privacy-policy')
            .subscribe({
                next: (res) => {
                    console.log('Privacy policy API response:', res); // 🐞 DEBUG

                    if (!res) {
                        this.errorMessage = 'Empty response from server';
                        return;
                    }

                    if (res.status !== true) {
                        this.errorMessage = res.message || 'Request failed';
                        return;
                    }

                    if (!res.data) {
                        this.errorMessage = 'No data returned from API';
                        return;
                    }

                    // ✅ Localized title
                    this.title = this.currentLang === 'ar'
                        ? res.data.title_ar
                        : res.data.title_en;

                    // ✅ Localized description
                    const description =
                        this.currentLang === 'ar'
                            ? res.data.description_ar
                            : res.data.description_en;

                    console.log('Current lang:', this.currentLang);
                    console.log('Title:', this.title);
                    console.log('Description exists:', !!description);

                    if (!description || description === 'null') {
                        this.errorMessage = 'Description is empty';
                        return;
                    }

                    // ✅ Trust backend HTML
                    this.content = this.sanitizer.bypassSecurityTrustHtml(description);
                },

                error: (err) => {
                    console.error('HTTP error:', err);
                    this.errorMessage = 'Server error. Please try again later.';
                },

                complete: () => {
                    this.loading = false;
                }
            });
    }
}
