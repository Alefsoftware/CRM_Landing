import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService } from '../../translate.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NavbarStyleTwoComponent,
        FooterStyleFourComponent,
        BackToTopComponent,
        RouterLink
    ]
})
export class SignUpPageComponent implements OnInit {
    signupForm!: FormGroup;
    successMessage: string | null = null;
    backendErrors: string[] = [];
    currentLang: 'en' | 'ar' = 'en';
    loading: boolean = false;
    showFormErrors: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        public translate: TranslateService,
        private router: Router
    ) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            company_name: [''],
            contact_name: ['', Validators.required],  // Only required
            phone: ['', Validators.required],         // Only required
            email: ['']  // Not required
        });
    }

    onSubmit(): void {
        this.showFormErrors = true;
        this.backendErrors = [];
        this.successMessage = null;

        if (this.signupForm.invalid) {
            return;
        }

        this.loading = true;

        this.http.post<any>(
            'https://admin.realstatecrm-development.dev.alefsoftware.com/site/request-demo',
            this.signupForm.value
        ).subscribe({
            next: (res) => {
                this.loading = false;
                if (res.status === true) {
                    this.successMessage = '✅ Company registered successfully!';
                    this.signupForm.reset();
                    this.showFormErrors = false;
                    setTimeout(() => this.successMessage = null, 5000);
                } else if (res.message) {
                    // Split comma-separated message into array
                    this.backendErrors = res.message.split(',').map((m: string) => m.trim());
                }
            },
            error: (err) => {
                this.loading = false;
                console.log('ERROR RESPONSE:', err);

                if (err.error?.message) {
                    this.backendErrors = err.error.message.split(',').map((m: string) => m.trim());
                } else {
                    this.backendErrors = ['Something went wrong'];
                }
            }
        });
    }
}