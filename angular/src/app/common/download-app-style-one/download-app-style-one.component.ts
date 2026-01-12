import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountUpModule } from "ngx-countup";

@Component({
    selector: 'app-download-app-style-one',
    imports: [CommonModule, CountUpModule],
    templateUrl: './download-app-style-one.component.html',
    styleUrls: ['./download-app-style-one.component.scss']
})
export class DownloadAppStyleOneComponent implements OnInit {
    currentLang: 'en' | 'ar' = 'en';

    constructor(private router: Router) {
        // Extract language from URL (e.g., /ar/app-download or /en/app-download)
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        // Additional initialization if needed
    }
}