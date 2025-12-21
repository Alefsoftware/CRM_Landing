import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService } from '../../translate.service'; // adjust path
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
        CommonModule,            // ✅ Required for *ngIf
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
    backendErrors: any = {};
    currentLang: 'en' | 'ar' = 'en';
    loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        public translate: TranslateService,
        private router: Router
    ) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        // set html attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            company_name: ['', Validators.required],
            contact_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit(): void {
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.backendErrors = {};
        this.successMessage = null;

        this.http.post<any>(
            'https://admin.realstatecrm-development.dev.alefsoftware.com/site/request-demo',
            this.signupForm.value
        )
            .subscribe({
                next: (res) => {
                    this.loading = false;
                    if (res.status === true) {
                        this.successMessage = '✅ Company registered successfully!';
                        this.signupForm.reset();
                        setTimeout(() => this.successMessage = null, 5000);
                    } else {
                        this.backendErrors = { general: res.message || 'Something went wrong' };
                    }
                },
                error: (err) => {
                    this.loading = false;
                    console.log('ERROR RESPONSE:', err);

                    if (err.error?.message) {
                        this.backendErrors = { general: err.error.message };
                    } else if (err.error?.errors) {
                        // Laravel-style validation errors
                        const firstKey = Object.keys(err.error.errors)[0];
                        this.backendErrors = { general: err.error.errors[firstKey][0] };
                    } else {
                        this.backendErrors = { general: 'Something went wrong' };
                    }
                }
            });
    }
}
