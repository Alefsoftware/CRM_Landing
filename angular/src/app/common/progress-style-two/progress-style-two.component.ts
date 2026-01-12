import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-progress-style-two',
    imports: [RouterLink],
    templateUrl: './progress-style-two.component.html',
    styleUrls: ['./progress-style-two.component.scss']
})
export class ProgressStyleTwoComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(private router: Router) {
        // Extract language from URL (e.g., /ar/about or /en/about)
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        // Additional initialization if needed
    }
}