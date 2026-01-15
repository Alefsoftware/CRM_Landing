import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

    // Add this getter to safely get HTML content
    get contactTitle(): SafeHtml {
        if (!this.contactData) return '';

        const content = this.currentLang === 'ar'
            ? this.contactData.contact_title_ar
            : this.contactData.contact_title_en;

        return this.sanitizer.bypassSecurityTrustHtml(content || '');
    }

    // Add this getter for description if needed
    get contactDescription(): SafeHtml {
        if (!this.contactData) return '';

        const content = this.currentLang === 'ar'
            ? this.contactData.contact_desc_ar
            : this.contactData.contact_desc_en;

        return this.sanitizer.bypassSecurityTrustHtml(content || '');
    }

    constructor(
        private http: HttpClient,
        private router: Router,
        private sanitizer: DomSanitizer // Inject DomSanitizer
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
}