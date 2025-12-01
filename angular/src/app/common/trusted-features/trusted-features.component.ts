import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Required
import { TranslateService } from '../../translate.service'; // adjust path
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-trusted-features',
    imports: [CommonModule, RouterModule],

    templateUrl: './trusted-features.component.html',
    styleUrls: ['./trusted-features.component.scss']
})
export class TrustedFeaturesComponent implements OnInit {
    bestappData: any;
    currentLang: 'en' | 'ar' = 'en';
    bestapps: any[] = [];
    apiUrl = 'https://admin.realstatecrm-development.dev.alefsoftware.com/site';

    constructor(private http: HttpClient, public translate: TranslateService, private router: Router,) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        // set <html> attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.fetchBestApp();
    }

    fetchBestApp(): void {
        this.http.get<any>(this.apiUrl).subscribe(response => {
            if (response.status && response.data.best_app) {
                this.bestappData = response.data.best_app.details;
                this.bestapps = Object.values(response.data.best_app.items);
                console.log(this.bestapps);
            }
        });
    }
    goToSignUp(): void {
        this.router.navigate([`/${this.currentLang}/sign-up`]);
    }
}
