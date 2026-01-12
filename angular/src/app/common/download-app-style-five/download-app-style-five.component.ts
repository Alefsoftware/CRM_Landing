import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-download-app-style-five',
    imports: [CommonModule],
    templateUrl: './download-app-style-five.component.html',
    styleUrls: ['./download-app-style-five.component.scss']
})
export class DownloadAppStyleFiveComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(private router: Router) {
        // Extract language from URL
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        // Additional initialization if needed
    }
}