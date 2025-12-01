import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer-style-four',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './footer-style-four.component.html',
    styleUrls: ['./footer-style-four.component.scss'],
})
export class FooterStyleFourComponent {
    currentLang: 'en' | 'ar' = 'en';

    constructor(private router: Router) {
        // detect language from URL
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

        // update <html> attributes for direction
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }
}
