import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-features-style-one',
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterLink],
    templateUrl: './features-style-one.component.html',
    styleUrls: ['./features-style-one.component.scss']
})
export class FeaturesStyleOneComponent implements OnInit {

    features: any[] = [];
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        this.http
            .get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site/features')
            .subscribe(res => {
                if (res?.status && res.data?.full_process_tracking) {
                    this.features = res.data.full_process_tracking;
                }
            });
    }

    getTitle(item: any): string {
        return this.currentLang === 'ar'
            ? item.title_ar
            : item.title_en;
    }

    getDescription(item: any): string {
        return this.currentLang === 'ar'
            ? item.description_ar
            : item.description_en;
    }
}
