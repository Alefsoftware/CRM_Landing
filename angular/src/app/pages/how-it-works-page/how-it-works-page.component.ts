import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-how-it-works-page',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterLink,
        NavbarStyleTwoComponent,
        DownloadAppStyleOneComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './how-it-works-page.component.html',
    styleUrls: ['./how-it-works-page.component.scss'],
})
export class HowItWorksPageComponent implements OnInit {
    howWorks: any[] = [];
    lang: 'en' | 'ar' = 'en'; // default language

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/howWorks')
            .subscribe((response) => {
                if (response.status && response.data?.howWorks) {
                    this.howWorks = response.data.howWorks;
                }
            });
    }

    switchLanguage(language: 'en' | 'ar') {
        this.lang = language;
    }
}
