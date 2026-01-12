import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
// ... other imports

@Component({
    selector: 'app-features-two-page',
    imports: [RouterLink, /* ... other imports */],
    templateUrl: './features-two-page.component.html',
    styleUrls: ['./features-two-page.component.scss']
})
export class FeaturesTwoPageComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.detectLanguage();
    }

    ngOnInit(): void {
        // Optional: Listen for URL changes
        this.router.events.subscribe(() => {
            this.detectLanguage();
        });
    }

    private detectLanguage(): void {
        // Method 1: From URL path
        const urlSegments = this.router.url.split('/').filter(segment => segment);
        if (urlSegments.length > 0 && (urlSegments[0] === 'ar' || urlSegments[0] === 'en')) {
            this.currentLang = urlSegments[0] as 'en' | 'ar';
        }

    }
}