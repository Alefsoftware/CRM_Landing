import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hometwo-software-integrations',
    imports: [RouterLink, CommonModule],
    templateUrl: './hometwo-software-integrations.component.html',
    styleUrls: ['./hometwo-software-integrations.component.scss']
})
export class HometwoSoftwareIntegrationsComponent implements OnInit {
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