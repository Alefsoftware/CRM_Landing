import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-download-app-style-four',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './download-app-style-four.component.html',
    styleUrls: ['./download-app-style-four.component.scss']
})
export class DownloadAppStyleFourComponent implements OnInit {
    downloadAppData: any = null;
    currentLang: 'en' | 'ar' = 'en';
    constructor(private http: HttpClient, private router: Router) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';

        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
            .subscribe(response => {
                this.downloadAppData = response?.data?.download_app;
            });
    }
}
