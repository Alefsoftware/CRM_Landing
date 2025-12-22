import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-privacy-policy-page',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterLink,
        NavbarStyleTwoComponent,
        DownloadAppStyleTwoComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './privacy-policy-page.component.html',
    styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent implements OnInit {

    title = '';
    content!: SafeHtml;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.getPrivacyPolicy();
    }

    getPrivacyPolicy(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/privacy-policy')
            .subscribe(res => {
                if (res?.status && res?.data) {
                    this.title = res.data.title_en;

                    // VERY IMPORTANT
                    this.content = this.sanitizer.bypassSecurityTrustHtml(
                        res.data.description_en
                    );
                }
            });
    }
}
