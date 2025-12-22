import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarStyleTwoComponent } from "../../common/navbar-style-two/navbar-style-two.component";
import { DownloadAppStyleTwoComponent } from "../../common/download-app-style-two/download-app-style-two.component";
import { FooterStyleFourComponent } from "../../common/footer-style-four/footer-style-four.component";
import { BackToTopComponent } from "../../common/back-to-top/back-to-top.component";

@Component({
    selector: 'app-terms-conditions-page',
    templateUrl: './terms-conditions-page.component.html',
    styleUrls: ['./terms-conditions-page.component.scss'],
    imports: [NavbarStyleTwoComponent, DownloadAppStyleTwoComponent, FooterStyleFourComponent, BackToTopComponent]
})
export class TermsConditionsPageComponent implements OnInit {

    contentEn: string = '';
    contentAr: string = '';
    currentLang: 'en' | 'ar' = 'en';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // اختيار اللغة من URL أو أي مكان
        const urlLang = window.location.pathname.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

        // جلب البيانات من API
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/terms-and-conditions')
            .subscribe(res => {
                if (res?.status && res.data) {
                    this.contentEn = res.data.description_en;
                    this.contentAr = res.data.description_ar;
                }
            });
    }

    get contentHtml() {
        return this.currentLang === 'ar' ? this.contentAr : this.contentEn;
    }
}
