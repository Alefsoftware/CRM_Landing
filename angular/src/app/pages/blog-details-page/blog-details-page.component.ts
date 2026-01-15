import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-blog-details-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        RouterModule,
        NavbarStyleTwoComponent,
        DownloadAppStyleOneComponent,
        BlogSidebarComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './blog-details-page.component.html',
    styleUrls: ['./blog-details-page.component.scss']
})
export class BlogDetailsPageComponent implements OnInit {
    blog: any = null;
    slug: string = '';
    currentLang: 'en' | 'ar' = 'en'; // ✅ added
    safeDescription: SafeHtml | null = null;
    isLoading: boolean = true; // Optional: for loading state

    private sanitizer = inject(DomSanitizer);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient); // ✅ Use HttpClient for better error handling

    ngOnInit(): void {
        // Get language from URL parameters
        this.route.paramMap.subscribe(params => {
            this.currentLang = (params.get('lang') as 'en' | 'ar') || 'en';
            this.slug = params.get('slug') || '';

            if (this.slug) {
                this.fetchBlogDetails();
            }
        });
    }

    fetchBlogDetails(): void {
        this.isLoading = true;
        const url = `https://admin.souqleader.com/site/blogs/${this.slug}`;
        console.log('Requesting URL:', url);

        // Using HttpClient for better error handling and TypeScript support
        this.http.get<any>(url).subscribe({
            next: (response) => {
                console.log('Response received:', response);
                if (response.status && response.data?.blog) {
                    this.blog = response.data.blog;

                    // Set safe description based on current language
                    if (this.currentLang === 'ar' && this.blog.description_ar) {
                        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_ar);
                    } else if (this.blog.description_en) {
                        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_en);
                    }

                    // Set direction for RTL support
                    this.setPageDirection();
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading blog:', error);
                this.isLoading = false;
            }
        });
    }

    // Helper method to get localized content
    getLocalizedContent(): any {
        if (!this.blog) return null;

        if (this.currentLang === 'ar') {
            return {
                title: this.blog.title_ar || this.blog.title_en,
                description: this.blog.description_ar || this.blog.description_en,
                category: this.blog.category_ar || this.blog.category_en,
                // Add other localized fields as needed
            };
        } else {
            return {
                title: this.blog.title_en,
                description: this.blog.description_en,
                category: this.blog.category_en,
            };
        }
    }

    // Set page direction based on language
    private setPageDirection(): void {
        if (typeof document !== 'undefined') {
            document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = this.currentLang;
        }
    }

    // Helper method to get date in localized format
    getLocalizedDate(): string {
        if (!this.blog?.created_at) return '';

        const date = new Date(this.blog.created_at);
        return this.currentLang === 'ar'
            ? date.toLocaleDateString('ar-SA')
            : date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
    }

    // Optional: Method to switch language
    switchLanguage(lang: 'en' | 'ar'): void {
        this.currentLang = lang;
        this.setPageDirection();

        // Update description based on new language
        if (this.blog) {
            if (lang === 'ar' && this.blog.description_ar) {
                this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_ar);
            } else if (this.blog.description_en) {
                this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_en);
            }
        }
    }
}