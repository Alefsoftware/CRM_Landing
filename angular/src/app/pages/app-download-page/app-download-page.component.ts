import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-app-download-page',
    imports: [
        RouterLink,
        CommonModule, // Add CommonModule for *ngIf
        NavbarStyleTwoComponent,
        DownloadAppStyleOneComponent,
        DownloadAppStyleTwoComponent,
        PartnerComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './app-download-page.component.html',
    styleUrls: ['./app-download-page.component.scss']
})
export class AppDownloadPageComponent implements OnInit {
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