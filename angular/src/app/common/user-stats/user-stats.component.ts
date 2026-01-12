import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-stats',
    imports: [CommonModule], // Add CommonModule for *ngIf
    templateUrl: './user-stats.component.html',
    styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
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