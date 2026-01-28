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

    author_name_en?: string;
    author_name_ar?: string;
    author_image?: string;
    author_role?: string;
    author_role_ar?: string;
    author_bio_en?: string;
    author_bio_ar?: string;

    prev_blog?: { slug: string; title_en: string; title_ar: string; };
    next_blog?: { slug: string; title_en: string; title_ar: string; };
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

    private readonly siteName = 'SouqLeader';
    private readonly siteUrl = 'https://souqleader.com';
    private readonly defaultHashtags = 'SouqLeader,Blog';
    private readonly viaHandle = '@SouqLeader';

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
        this.removeDynamicMetaTags();
    }

    fetchBlogDetails(): void {
        this.isLoading = true;
        const url = `https://admin.souqleader.com/site/blogs/${this.slug}`;

        this.http.get<any>(url).subscribe({
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

        if (this.currentLang === 'ar' && this.blog.description_ar) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_ar);
        } else if (this.blog.description_en) {
            this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_en);
        }

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

    private getFullBlogUrl(): string {
        return `${this.siteUrl}/${this.currentLang}/blog-details/${this.slug}`;
    }

    private getBlogTitle(): string {
        if (!this.blog) return this.siteName;
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

        // Try to get short description, fall back to first 150 chars of description
        if (this.currentLang === 'ar') {
            return this.blog.short_description_ar ||
                this.blog.description_ar?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' ||
                this.blog.title_ar || '';
        } else {
            return this.blog.short_description_en ||
                this.blog.description_en?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' ||
                this.blog.title_en || '';
        }
    }

    private getPlainDescription(): string {
        if (!this.blog) return '';

        let description = '';
        if (this.currentLang === 'ar') {
            description = this.blog.description_ar || this.blog.short_description_ar || '';
        } else {
            description = this.blog.description_en || this.blog.short_description_en || '';
        }

        // Remove HTML tags and limit length
        return description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    }

    private getBlogImageUrl(): string {
        if (!this.blog?.image) return `${this.siteUrl}/assets/img/logo.png`;

        // Ensure proper URL format
        if (this.blog.image.startsWith('http')) {
            return this.blog.image;
        } else if (this.blog.image.startsWith('/')) {
            return `https://admin.souqleader.com${this.blog.image}`;
        } else {
            return `https://admin.souqleader.com/${this.blog.image}`;
        }
    }

    // Facebook Share - Full OG tags support
    getFacebookShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        const quote = encodeURIComponent(`${this.getBlogTitle()} - ${this.getAuthorName()}`);
        return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    }

    // Twitter Share - Includes image via Twitter Card
    getTwitterShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        const text = encodeURIComponent(`${this.getBlogTitle()} by ${this.getAuthorName()}`);
        const hashtags = encodeURIComponent(this.defaultHashtags);
        const via = encodeURIComponent(this.viaHandle);

        return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}&via=${via}`;
    }

    // LinkedIn Share - Professional sharing
    getLinkedInShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        const title = encodeURIComponent(this.getBlogTitle());
        const summary = encodeURIComponent(this.getPlainDescription());

        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    // WhatsApp Share - Full content
    getWhatsAppShareUrl(): string {
        const url = this.getFullBlogUrl();
        const title = this.getBlogTitle();
        const description = this.getPlainDescription();
        const author = this.getAuthorName();

        const text = `📚 *${title}* ${author ? `by ${author}` : ''}\n\n${description}\n\n🔗 Read full article: ${url}`;
        const encodedText = encodeURIComponent(text);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        return isMobile ?
            `whatsapp://send?text=${encodedText}` :
            `https://web.whatsapp.com/send?text=${encodedText}`;
    }

    // Email Share - Rich format
    getEmailShareUrl(): string {
        const subject = encodeURIComponent(`Check out: ${this.getBlogTitle()} - ${this.siteName}`);
        const body = encodeURIComponent(
            `Hi,\n\nI found this interesting article and thought you might like it:\n\n` +
            `📖 *${this.getBlogTitle()}*${this.getAuthorName() ? `\n✍️ Author: ${this.getAuthorName()}` : ''}\n\n` +
            `${this.getPlainDescription()}\n\n` +
            `🔗 Read the full article here: ${this.getFullBlogUrl()}\n\n` +
            `Best regards,\n${this.siteName} Team`
        );

        return `mailto:?subject=${subject}&body=${body}`;
    }

    // Copy Link with rich text
    copyBlogLink(): void {
        const shareData = {
            title: this.getBlogTitle(),
            text: `${this.getBlogTitle()}${this.getAuthorName() ? ` by ${this.getAuthorName()}` : ''}\n\n${this.getPlainDescription()}`,
            url: this.getFullBlogUrl()
        };

        // Try Web Share API first (mobile devices)
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => {
                    this.showCopyFeedback(true);
                })
                .catch(err => {
                    console.log('Web Share failed, falling back to clipboard:', err);
                    this.copyToClipboard();
                });
        } else {
            this.copyToClipboard();
        }
    }

    private copyToClipboard(): void {
        const shareText = `${this.getBlogTitle()}${this.getAuthorName() ? ` by ${this.getAuthorName()}` : ''}\n\n${this.getPlainDescription()}\n\n${this.getFullBlogUrl()}`;

        navigator.clipboard.writeText(shareText).then(() => {
            this.showCopyFeedback(true);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyFeedback(true);
        });
    }

    private showCopyFeedback(success: boolean): void {
        this.linkCopied = true;
        setTimeout(() => {
            this.linkCopied = false;
        }, 2000);
    }

    // === META TAGS FOR SOCIAL MEDIA PREVIEW ===

    private updateMetaTags(): void {
        if (!this.blog) return;

        const title = this.getBlogTitle();
        const description = this.getBlogDescription();
        const plainDescription = this.getPlainDescription();
        const imageUrl = this.getBlogImageUrl();
        const currentUrl = this.getCurrentUrl();
        const author = this.getAuthorName();
        const publishedTime = this.blog.created_at;
        const modifiedTime = this.blog.updated_at || this.blog.created_at;

        // Set page title
        document.title = `${title} | ${this.siteName}`;

        // Basic meta
        this.meta.updateTag({ name: 'description', content: plainDescription });

        // Open Graph meta (Facebook, LinkedIn, etc.)
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: plainDescription });
        this.meta.updateTag({ property: 'og:image', content: imageUrl });
        this.meta.updateTag({ property: 'og:image:width', content: '1200' });
        this.meta.updateTag({ property: 'og:image:height', content: '630' });
        this.meta.updateTag({ property: 'og:image:alt', content: title });
        this.meta.updateTag({ property: 'og:url', content: currentUrl });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
        this.meta.updateTag({ property: 'og:locale', content: this.currentLang === 'ar' ? 'ar_AR' : 'en_US' });

        // Article specific OG tags
        this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
        this.meta.updateTag({ property: 'article:modified_time', content: modifiedTime });

        if (author) {
            this.meta.updateTag({ property: 'article:author', content: author });
        }

        if (this.blog.category_en || this.blog.category_ar) {
            const category = this.currentLang === 'ar'
                ? (this.blog.category_ar || this.blog.category_en)
                : this.blog.category_en;
            this.meta.updateTag({ property: 'article:section', content: category || '' });
        }

        // Twitter Card meta
        this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.updateTag({ name: 'twitter:title', content: title });
        this.meta.updateTag({ name: 'twitter:description', content: plainDescription });
        this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
        this.meta.updateTag({ name: 'twitter:image:alt', content: title });
        this.meta.updateTag({ name: 'twitter:site', content: this.viaHandle });
        this.meta.updateTag({ name: 'twitter:creator', content: this.viaHandle });

        // Additional meta for better sharing
        this.meta.updateTag({ name: 'keywords', content: this.getKeywords() });
        this.meta.updateTag({ property: 'og:see_also', content: this.siteUrl });
    }

    private getKeywords(): string {
        if (!this.blog) return 'blog, article, news';

        const tags = this.blog.tags || [];
        const category = this.currentLang === 'ar'
            ? (this.blog.category_ar || this.blog.category_en || '')
            : (this.blog.category_en || '');

        return [...tags, category, this.siteName, 'blog'].join(', ');
    }

    private removeDynamicMetaTags(): void {
        const tags = [
            'description',
            'keywords',
            'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height',
            'og:image:alt', 'og:url', 'og:type', 'og:site_name', 'og:locale', 'og:see_also',
            'article:published_time', 'article:modified_time', 'article:author', 'article:section',
            'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image',
            'twitter:image:alt', 'twitter:site', 'twitter:creator'
        ];

        tags.forEach(tag => {
            this.meta.removeTag(`name="${tag}"`);
            this.meta.removeTag(`property="${tag}"`);
        });
    }

    // === HELPER METHODS ===

    getLocalizedDate(): string {
        if (!this.blog?.created_at) return '';

        const date = new Date(this.blog.created_at);

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleDateString(
            this.currentLang === 'ar' ? 'ar-SA' : 'en-US',
            options
        );
    }

    getFormattedDate(): string {
        if (!this.blog?.created_at) return '';
        return new Date(this.blog.created_at).toISOString();
    }

    // Open social sharing in popup window
    openSocialWindow(event: Event, url: string, platform: string): void {
        event.preventDefault();

        const width = platform === 'twitter' ? 550 : 600;
        const height = platform === 'twitter' ? 420 : 400;

        const left = Math.max(0, (window.screen.width - width) / 2);
        const top = Math.max(0, (window.screen.height - height) / 2);

        const windowFeatures = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no`;

        window.open(url, 'social-share', windowFeatures);
    }
}