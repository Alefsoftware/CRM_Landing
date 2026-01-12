import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact-info',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './contact-info.component.html',
    styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
    contactData: any = null;
    lines = Array(5);
    apiUrl = 'https://admin.realstatecrm-development.dev.alefsoftware.com/site/contactus';
    currentLang: 'en' | 'ar' = 'en';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        // Extract language from URL
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        this.fetchContactData();
    }

    fetchContactData() {
        this.http.get(this.apiUrl).subscribe((res: any) => {
            if (res.status && res.data) {
                this.contactData = res.data;
            }
        }, error => {
            console.error('Error fetching contact data:', error);
        });
    }

    // Helper methods to get language-specific text
    getTitle(): string {
        if (!this.contactData) return '';
        return this.currentLang === 'ar'
            ? this.contactData.title_ar
            : this.contactData.title_en;
    }

    getDescription(): string {
        if (!this.contactData) return '';
        return this.currentLang === 'ar'
            ? this.contactData.description_ar
            : this.contactData.description_en;
    }

    getAddress(): string {
        if (!this.contactData) return '';
        return this.currentLang === 'ar'
            ? this.contactData.address_ar
            : this.contactData.address_en;
    }

    // You can add more getters as needed based on your API response structure
}