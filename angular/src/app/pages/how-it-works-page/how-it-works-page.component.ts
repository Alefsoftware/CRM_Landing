import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { DownloadAppStyleTwoComponent } from "../../common/download-app-style-two/download-app-style-two.component";
import { DownloadAppStyleThreeComponent } from "../../common/download-app-style-three/download-app-style-three.component";

@Component({
    selector: 'app-how-it-works-page',
    standalone: true,
    imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavbarStyleTwoComponent,
    DownloadAppStyleOneComponent,
    FooterStyleFourComponent,
    BackToTopComponent,
    DownloadAppStyleTwoComponent,
    DownloadAppStyleThreeComponent
],
    templateUrl: './how-it-works-page.component.html',
    styleUrls: ['./how-it-works-page.component.scss']
})
export class HowItWorksPageComponent implements OnInit {
    howWorks: any[] = [];
    currentLang: 'en' | 'ar' = 'en';

    constructor(private http: HttpClient, private router: Router) {
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/howWorks')
            .subscribe(res => {
                if (res?.status && res.data?.howWorks) {
                    this.howWorks = res.data.howWorks;
                }
            });
    }

    getTitle(step: any): string {
        return this.currentLang === 'ar' ? step.title_ar : step.title_en;
    }

    getDescription(step: any): string {
        return this.currentLang === 'ar' ? step.description_ar : step.description_en;
    }
}
