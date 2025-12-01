import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { TranslateService } from './translate.service'; // ✅ import the service

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] // ✅ should be "styleUrls", not "styleUrl"
})
export class AppComponent {
    title = 'Souqleader - Leads CRM';
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private router: Router,
        private viewportScroller: ViewportScroller,
        public translate: TranslateService
    ) {
        // Scroll to top on route change
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.viewportScroller.scrollToPosition([0, 0]);

                // detect language from the URL (first segment)
                const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
                this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

                // apply translation service
                this.translate.switchLang(this.currentLang);

                // apply RTL/LTR to <html> tag
                document.documentElement.lang = this.currentLang;
                document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
            }
        });
    }

    // ✅ translation helper
    t(key: string) {
        return this.translate.t(key);
    }

    // ✅ switch language manually
    changeLang(lang: 'en' | 'ar') {
        if (this.currentLang !== lang) {
            this.currentLang = lang;
            this.translate.switchLang(lang);

            // Navigate to same page but with new lang prefix
            const segments = this.router.url.split('/');
            segments[1] = lang; // replace language segment
            this.router.navigateByUrl(segments.join('/'));

            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
    }
}
