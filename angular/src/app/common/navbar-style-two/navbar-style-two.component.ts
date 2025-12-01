import { NgClass, CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '../../translate.service'; // adjust path

@Component({
    selector: 'app-navbar-style-two',
    standalone: true,
    imports: [NgClass, RouterLink, RouterLinkActive, CommonModule], // ✅ NgClass is standalone
    templateUrl: './navbar-style-two.component.html',
    styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent {
    classApplied = false;
    isSticky = false;
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private router: Router,
        public translate: TranslateService
    ) {
        // detect lang from URL
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    @HostListener('window:scroll', [])
    checkScroll() {
        const scrollPosition =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        this.isSticky = scrollPosition >= 50;
    }

    changeLang(lang: 'en' | 'ar') {
        if (this.currentLang !== lang) {
            this.currentLang = lang;
            this.translate.switchLang(lang);

            // replace lang in URL
            const segments = this.router.url.split('/');
            segments[1] = lang;
            this.router.navigateByUrl(segments.join('/'));

            // update html attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }
    switchLang() {
        const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.changeLang(newLang);
        // Redirect and refresh the page
        window.location.href = window.location.pathname;
    }
}
