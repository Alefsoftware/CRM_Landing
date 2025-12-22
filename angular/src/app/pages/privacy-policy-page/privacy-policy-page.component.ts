import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { TranslateService } from '../../../translate.service';

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

    currentLang: 'en' | 'ar' = 'en';
    title = '';
    content!: SafeHtml;

    constructor(
        private http: HttpClient,
        private router: Router,
        private sanitizer: DomSanitizer,
        public translate: TranslateService
    ) {
        // 🔹 Detect language from URL
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

        this.translate.switchLang(this.currentLang);

        // 🔹 Set HTML attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.getPrivacyPolicy();
    }

    getPrivacyPolicy(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/privacy-policy')
            .subscribe({
                next: (res) => {
                    if (res?.status && res?.data) {

                        // ✅ Localized title
                        this.title = this.currentLang === 'ar'
                            ? res.data.title_ar
                            : res.data.title_en;

                        // ✅ Localized HTML content
                        const description =
                            this.currentLang === 'ar'
                                ? res.data.description_ar
                                : res.data.description_en;

                        this.content = this.sanitizer.bypassSecurityTrustHtml(description);
                    }
                },
                error: (err) => {
                    console.error('Failed to load privacy policy:', err);
                }
            });
    }
}
