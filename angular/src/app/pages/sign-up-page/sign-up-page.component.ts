import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService } from '../../translate.service'; // adjust path
import { Router } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { RouterLink } from '@angular/router';



@Component({
    selector: 'app-signup',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss'],
    standalone: true, // ✅ mark it standalone
    imports: [ReactiveFormsModule, HttpClientModule, NavbarStyleTwoComponent, FooterStyleFourComponent, BackToTopComponent, RouterLink], // ✅ add required modules
})
export class SignUpPageComponent implements OnInit {
    signupForm!: FormGroup;
    successMessage: string | null = null;
    backendErrors: any = {};
    currentLang: 'en' | 'ar' = 'en';

    constructor(private fb: FormBuilder, private http: HttpClient, public translate: TranslateService, private router: Router,

    ) {
        const urlLang = this.router.url.split('/')[1] as 'en' | 'ar';
        this.currentLang = urlLang === 'ar' ? 'ar' : 'en';
        this.translate.switchLang(this.currentLang);

        // set <html> attributes
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    }

    ngOnInit(): void {
        this.signupForm = this.fb.group({
            company_name: ['', Validators.required],
            contact_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            // phone: [0, Validators.required],
            // password: ['', Validators.required],
            // password_confirmation: ['', Validators.required],
            // plan: [1, Validators.required],
        });
    }

    onSubmit(): void {
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }

        this.http.post<any>(
            'https://admin.realstatecrm-development.dev.alefsoftware.com/site/addCompany',
            this.signupForm.value
        )
            .subscribe({
                next: (res) => {
                    if (res.status === true) {
                        this.successMessage = '✅ Company registered successfully!';
                        this.backendErrors = {};
                        this.signupForm.reset();
                        setTimeout(() => this.successMessage = null, 5000);
                    } else {
                        this.backendErrors = res.message;
                    }
                },
                error: (err) => {
                    console.error('Backend error:', err); // 👈 shows raw response in console

                    if (err.error?.errors) {
                        // Laravel-style validation errors: { field: [ "msg1", "msg2" ] }
                        this.backendErrors = err.error.errors;
                    } else if (err.error?.message) {
                        // Custom backend error: { "message": "Email already exists" }
                        this.backendErrors = { general: err.error.message };
                    } else if (typeof err.error === 'string') {
                        // Sometimes backend sends plain text
                        this.backendErrors = { general: err.error };
                    } else {
                        this.backendErrors = { general: 'Something went wrong' };
                    }
                }

            });
    }
}
