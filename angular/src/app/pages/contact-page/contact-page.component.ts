import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        HttpClientModule,
        NavbarStyleTwoComponent,
        ContactInfoComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './contact-page.component.html',
    styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
    contactData: any = null;
    safeMapHtml: SafeHtml | null = null;
    currentLang: 'en' | 'ar' = 'en'; // Add currentLang property

    // Form model
    contactForm = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    // Form status
    successMessage: string = '';
    errorMessage: string = '';
    loading: boolean = false;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private router: Router // Add Router injection
    ) {
        // Extract language from URL
        const lang = this.router.url.split('/')[1];
        this.currentLang = lang === 'ar' ? 'ar' : 'en';
    }

    ngOnInit(): void {
        this.http.get('https://admin.realstatecrm-development.dev.alefsoftware.com/site/contactus')
            .subscribe((res: any) => {
                if (res.status && res.data) {
                    this.contactData = res.data;
                    this.safeMapHtml = this.sanitizer.bypassSecurityTrustHtml(this.contactData.contact_map);
                }
            });
    }

    submitForm(formRef: any) {
        this.successMessage = '';
        this.errorMessage = '';

        // Check form validity
        if (!formRef.valid) {
            this.errorMessage = this.currentLang === 'ar'
                ? 'يرجى ملء جميع الحقول المطلوبة ببيانات صحيحة.'
                : 'Please fill in all required fields with valid data.';
            return;
        }

        this.loading = true;

        const payload = {
            name: this.contactForm.name,
            email: this.contactForm.email,
            phone: this.contactForm.phone,
            subject: this.contactForm.subject,
            message: this.contactForm.message
        };

        this.http.post('https://admin.realstatecrm-development.dev.alefsoftware.com/site/sendmessage', payload)
            .subscribe({
                next: (res: any) => {
                    this.loading = false;
                    this.successMessage = this.currentLang === 'ar'
                        ? 'تم إرسال الرسالة بنجاح!'
                        : 'Message sent successfully!';
                    this.contactForm = { name: '', email: '', phone: '', subject: '', message: '' };
                    formRef.resetForm(); // reset Angular form state
                },
                error: (err) => {
                    this.loading = false;
                    this.errorMessage = this.currentLang === 'ar'
                        ? 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                        : 'Failed to send message. Please try again.';
                }
            });
    }
}