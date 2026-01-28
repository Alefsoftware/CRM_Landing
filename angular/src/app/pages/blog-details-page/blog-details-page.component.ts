import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

// Define Blog Interface
export interface Blog {
    id: number;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    short_description_en?: string;
    short_description_ar?: string;
    image: string;
    slug: string;
    created_at: string;
    updated_at?: string;
    category_en?: string;
    category_ar?: string;
    tags?: string[];

    // Author fields
    author_name_en?: string;
    author_name_ar?: string;
    author_image?: string;
    author_role?: string;
    author_role_ar?: string;
    author_bio_en?: string;
    author_bio_ar?: string;
    author_email?: string;
    author_social?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };

    // Navigation
    prev_blog?: {
        slug: string;
        title_en: string;
        title_ar: string;
        image?: string;
    };
    next_blog?: {
        slug: string;
        title_en: string;
        title_ar: string;
        image?: string;
    };

    // SEO fields
    meta_title_en?: string;
    meta_title_ar?: string;
    meta_description_en?: string;
    meta_description_ar?: string;
    meta_keywords_en?: string;
    meta_keywords_ar?: string;
}

interface BlogResponse {
    status: boolean;
    data: {
        blog: Blog;
    };
}

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
export class BlogDetailsPageComponent implements OnInit, OnDestroy {
    blog: Blog | null = null;
    slug: string = '';
    currentLang: 'en' | 'ar' = 'en';
    safeDescription: SafeHtml = '';
    isLoading: boolean = true;
    linkCopied: boolean = false;

    // Social sharing
    private readonly siteName = 'SouqLeader';
    private readonly defaultHashtags = 'SouqLeader,Blog';

    private sanitizer = inject(DomSanitizer);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private meta = inject(Meta);

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.currentLang = (params.get('lang') as 'en' | 'ar') || 'en';
            this.slug = params.get('slug') || '';

            if (this.slug) {
                this.fetchBlogDetails();
            } else {
                this.isLoading = false;
            }
        });
    }

    ngOnDestroy(): void {
        // Clean up meta tags when component is destroyed
        this.removeDynamicMetaTags();
    }

    fetchBlogDetails(): void {
        this.isLoading = true;
        const url = `https://admin.souqleader.com/site/blogs/${this.slug}`;

        this.http.get<BlogResponse>(url).subscribe({
            next: (response) => {
                if (response.status && response.data?.blog) {
                    this.blog = response.data.blog;
                    this.updateContentBasedOnLanguage();
                    this.updateMetaTags();
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading blog:', error);
                this.isLoading = false;
            }
        });
    }

    private updateContentBasedOnLanguage(): void {
        if (!this.blog) return;

        // Set safe description based on current language
        if (this.currentLang === 'ar' && this.blog.description_ar) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_ar);
        } else if (this.blog.description_en) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_en);
        }

        // Set page direction
        this.setPageDirection();
    }

    private setPageDirection(): void {
        if (typeof document !== 'undefined') {
            document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = this.currentLang;
        }
    }

    // === SOCIAL SHARING METHODS ===

    private getCurrentUrl(): string {
        return window.location.href;
    }

    private getBlogTitle(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.title_ar || this.blog.title_en)
            : this.blog.title_en;
    }

    private getAuthorName(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.author_name_ar || this.blog.author_name_en || '')
            : (this.blog.author_name_en || '');
    }

    private getBlogDescription(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.short_description_ar || this.blog.short_description_en || this.blog.description_ar?.substring(0, 150) || '')
            : (this.blog.short_description_en || this.blog.description_en?.substring(0, 150) || '');
    }

    private getBlogImageUrl(): string {
        if (!this.blog?.image) return '';
        return `https://admin.souqleader.com/${this.blog.image}`;
    }

    private getAuthorImageUrl(): string {
        if (!this.blog?.author_image) return '';
        return `https://admin.souqleader.com/${this.blog.author_image}`;
    }

    // Facebook Share
    getFacebookShareUrl(): string {
        const url = encodeURIComponent(this.getCurrentUrl());
        const quote = encodeURIComponent(`${this.getBlogTitle()} - ${this.getAuthorName()}`);
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    }

    // Twitter Share
    getTwitterShareUrl(): string {
        const url = encodeURIComponent(this.getCurrentUrl());
        const text = encodeURIComponent(`${this.getBlogTitle()} by ${this.getAuthorName()}`);
        const hashtags = encodeURIComponent(this.defaultHashtags);
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`;
    }

    // LinkedIn Share
    getLinkedInShareUrl(): string {
        const url = encodeURIComponent(this.getCurrentUrl());
        const title = encodeURIComponent(this.getBlogTitle());
        const summary = encodeURIComponent(`${this.getBlogDescription()} - Written by ${this.getAuthorName()}`);
        const source = encodeURIComponent(this.siteName);
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    // WhatsApp Share
    getWhatsAppShareUrl(): string {
        const url = this.getCurrentUrl();
        const text = `${this.getBlogTitle()} by ${this.getAuthorName()}\n\n${this.getBlogDescription()}\n\nRead more: ${url}`;
        const encodedText = encodeURIComponent(text);

        // Detect if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            return `whatsapp://send?text=${encodedText}`;
        } else {
            return `https://web.whatsapp.com/send?text=${encodedText}`;
        }
    }

    // Email Share
    getEmailShareUrl(): string {
        const subject = encodeURIComponent(`${this.getBlogTitle()} - ${this.siteName}`);
        const body = encodeURIComponent(
            `Check out this article: "${this.getBlogTitle()}" by ${this.getAuthorName()}\n\n` +
            `${this.getBlogDescription()}\n\n` +
            `Read the full article here: ${this.getCurrentUrl()}`
        );
        return `mailto:?subject=${subject}&body=${body}`;
    }

    // Copy Link
    copyBlogLink(): void {
        const currentUrl = this.getCurrentUrl();
        const shareText = `${this.getBlogTitle()} by ${this.getAuthorName()}\n\n${this.getBlogDescription()}\n\n${currentUrl}`;

        navigator.clipboard.writeText(shareText).then(() => {
            this.linkCopied = true;

            // Reset after 2 seconds
            setTimeout(() => {
                this.linkCopied = false;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // === META TAGS MANAGEMENT ===

    private updateMetaTags(): void {
        if (!this.blog) return;

        const title = this.getBlogTitle();
        const author = this.getAuthorName();
        const description = this.getBlogDescription();
        const imageUrl = this.getBlogImageUrl();
        const currentUrl = this.getCurrentUrl();

        // Basic meta tags
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: imageUrl });
        this.meta.updateTag({ property: 'og:url', content: currentUrl });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

        // Article specific meta tags
        this.meta.updateTag({ property: 'article:published_time', content: this.blog.created_at });
        if (this.blog.updated_at) {
            this.meta.updateTag({ property: 'article:modified_time', content: this.blog.updated_at });
        }
        this.meta.updateTag({ property: 'article:author', content: author });

        if (this.blog.category_en || this.blog.category_ar) {
            const category = this.currentLang === 'ar'
                ? (this.blog.category_ar || this.blog.category_en)
                : this.blog.category_en;
            this.meta.updateTag({ property: 'article:section', content: category || '' });
        }

        // Twitter Card meta tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
        this.meta.updateTag({ name: 'twitter:site', content: '@SouqLeader' });

        // Update page title
        document.title = `${title} - ${this.siteName}`;
    }

    private removeDynamicMetaTags(): void {
        const tagsToRemove = [
            'og:title', 'og:description', 'og:image', 'og:url', 'og:type',
            'og:site_name', 'article:published_time', 'article:modified_time',
            'article:author', 'article:section', 'twitter:card', 'twitter:title',
            'twitter:description', 'twitter:image', 'twitter:site'
        ];

        tagsToRemove.forEach(tag => {
            this.meta.removeTag(`property="${tag}"`);
            this.meta.removeTag(`name="${tag}"`);
        });
    }

    // === HELPER METHODS ===

    getLocalizedDate(): string {
        if (!this.blog?.created_at) return '';

        const date = new Date(this.blog.created_at);

        if (this.currentLang === 'ar') {
            return date.toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    getFormattedDate(): string {
        if (!this.blog?.created_at) return '';
        const date = new Date(this.blog.created_at);
        return date.toISOString().split('T')[0];
    }

    // Get author social links if available
    getAuthorSocialLinks(): Array<{ name: string, url: string, icon: string }> {
        if (!this.blog?.author_social) return [];

        const links = [];
        const social = this.blog.author_social;

        if (social.facebook) {
            links.push({
                name: 'Facebook',
                url: social.facebook,
                icon: 'ri-facebook-fill'
            });
        }

        if (social.twitter) {
            links.push({
                name: 'Twitter',
                url: social.twitter,
                icon: 'ri-twitter-fill'
            });
        }

        if (social.linkedin) {
            links.push({
                name: 'LinkedIn',
                url: social.linkedin,
                icon: 'ri-linkedin-fill'
            });
        }

        if (social.instagram) {
            links.push({
                name: 'Instagram',
                url: social.instagram,
                icon: 'ri-instagram-line'
            });
        }

        return links;
    }

    // Check if author has bio
    hasAuthorBio(): boolean {
        if (!this.blog) return false;
        return !!(this.blog.author_bio_en || this.blog.author_bio_ar);
    }

    // Get localized author bio
    getAuthorBio(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.author_bio_ar || this.blog.author_bio_en || '')
            : (this.blog.author_bio_en || '');
    }

    // Get localized author role
    getAuthorRole(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.author_role_ar || this.blog.author_role || '')
            : (this.blog.author_role || '');
    }
}