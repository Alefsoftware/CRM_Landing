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
import { Meta, Title } from '@angular/platform-browser';

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
    private titleService = inject(Title);

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
                    this.updateMetaTagsForSharing();
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

    // === PUBLIC METHODS FOR TEMPLATE ===

    getCurrentUrl(): string {
        return window.location.href;
    }

    getFullBlogUrl(): string {
        return `${this.siteUrl}/${this.currentLang}/blog-details/${this.slug}`;
    }

    getBlogTitle(): string {
        if (!this.blog) return this.siteName;
        return this.currentLang === 'ar'
            ? (this.blog.title_ar || this.blog.title_en)
            : this.blog.title_en;
    }

    getAuthorName(): string {
        if (!this.blog) return '';
        return this.currentLang === 'ar'
            ? (this.blog.author_name_ar || this.blog.author_name_en || '')
            : (this.blog.author_name_en || '');
    }

    getPlainDescription(): string {
        if (!this.blog) return '';

        let description = '';
        if (this.currentLang === 'ar') {
            description = this.blog.short_description_ar ||
                this.blog.description_ar?.replace(/<[^>]*>/g, '').substring(0, 150) ||
                this.blog.title_ar || '';
        } else {
            description = this.blog.short_description_en ||
                this.blog.description_en?.replace(/<[^>]*>/g, '').substring(0, 150) ||
                this.blog.title_en || '';
        }

        return description + (description.length > 150 ? '...' : '');
    }

    getBlogImageUrl(): string {
        if (!this.blog?.image) return `${this.siteUrl}/assets/img/logo.png`;

        if (this.blog.image.startsWith('http')) {
            return this.blog.image;
        } else if (this.blog.image.startsWith('/')) {
            return `https://admin.souqleader.com${this.blog.image}`;
        } else {
            return `https://admin.souqleader.com/${this.blog.image}`;
        }
    }

    // === SOCIAL SHARING METHODS ===

    getFacebookShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }

    getTwitterShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        const text = encodeURIComponent(this.getBlogTitle());
        const hashtags = encodeURIComponent(this.defaultHashtags);
        const via = encodeURIComponent(this.viaHandle);

        return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}&via=${via}`;
    }

    getLinkedInShareUrl(): string {
        const url = encodeURIComponent(this.getFullBlogUrl());
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    getWhatsAppShareUrl(): string {
        const url = this.getFullBlogUrl();
        const title = this.getBlogTitle();
        const description = this.getPlainDescription();

        const text = `📖 *${title}*\n\n${description}\n\n🔗 ${url}`;
        const encodedText = encodeURIComponent(text);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        return isMobile ?
            `whatsapp://send?text=${encodedText}` :
            `https://web.whatsapp.com/send?text=${encodedText}`;
    }

    getEmailShareUrl(): string {
        const subject = encodeURIComponent(`${this.getBlogTitle()} - ${this.siteName}`);
        const body = encodeURIComponent(
            `I thought you might be interested in this article:\n\n` +
            `📖 ${this.getBlogTitle()}\n\n` +
            `${this.getPlainDescription()}\n\n` +
            `Read the full article here: ${this.getFullBlogUrl()}\n\n` +
            `Best regards,\n${this.siteName} Team`
        );

        return `mailto:?subject=${subject}&body=${body}`;
    }

    // === META TAGS FOR SOCIAL MEDIA PREVIEW ===

    private updateMetaTagsForSharing(): void {
        if (!this.blog) return;

        const title = this.getBlogTitle();
        const description = this.getPlainDescription();
        const imageUrl = this.getBlogImageUrl();
        const currentUrl = this.getCurrentUrl();
        const author = this.getAuthorName();
        const publishedTime = this.blog.created_at;
        const modifiedTime = this.blog.updated_at || this.blog.created_at;

        // 1. Update Page Title
        this.titleService.setTitle(`${title} | ${this.siteName}`);

        // 2. Clear existing meta tags first
        this.removeDynamicMetaTags();

        // 3. Add Basic Meta Tags
        this.meta.addTag({ name: 'description', content: description });

        // 4. Open Graph Meta Tags (Facebook, LinkedIn, etc.)
        this.meta.addTag({ property: 'og:title', content: title });
        this.meta.addTag({ property: 'og:description', content: description });
        this.meta.addTag({ property: 'og:image', content: imageUrl });
        this.meta.addTag({ property: 'og:image:width', content: '1200' });
        this.meta.addTag({ property: 'og:image:height', content: '630' });
        this.meta.addTag({ property: 'og:image:alt', content: title });
        this.meta.addTag({ property: 'og:url', content: currentUrl });
        this.meta.addTag({ property: 'og:type', content: 'article' });
        this.meta.addTag({ property: 'og:site_name', content: this.siteName });
        this.meta.addTag({ property: 'og:locale', content: this.currentLang === 'ar' ? 'ar_AR' : 'en_US' });

        // 5. Article Specific Meta Tags
        this.meta.addTag({ property: 'article:published_time', content: publishedTime });
        this.meta.addTag({ property: 'article:modified_time', content: modifiedTime });

        if (author) {
            this.meta.addTag({ property: 'article:author', content: author });
        }

        if (this.blog.category_en || this.blog.category_ar) {
            const category = this.currentLang === 'ar'
                ? (this.blog.category_ar || this.blog.category_en)
                : this.blog.category_en;
            this.meta.addTag({ property: 'article:section', content: category || '' });
        }

        if (this.blog.tags && this.blog.tags.length > 0) {
            this.blog.tags.forEach(tag => {
                this.meta.addTag({ property: 'article:tag', content: tag });
            });
        }

        // 6. Twitter Card Meta Tags
        this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.meta.addTag({ name: 'twitter:title', content: title });
        this.meta.addTag({ name: 'twitter:description', content: description });
        this.meta.addTag({ name: 'twitter:image', content: imageUrl });
        this.meta.addTag({ name: 'twitter:image:alt', content: title });
        this.meta.addTag({ name: 'twitter:site', content: this.viaHandle });
        this.meta.addTag({ name: 'twitter:creator', content: this.viaHandle });

        // 7. Keywords for SEO
        if (this.blog.tags && this.blog.tags.length > 0) {
            const keywords = this.blog.tags.join(', ');
            this.meta.addTag({ name: 'keywords', content: keywords });
        }
    }

    private removeDynamicMetaTags(): void {
        // Remove only the dynamic tags we added
        const tagsToRemove = [
            'description',
            'keywords',
            'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height',
            'og:image:alt', 'og:url', 'og:type', 'og:site_name', 'og:locale',
            'article:published_time', 'article:modified_time', 'article:author', 'article:section',
            'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image',
            'twitter:image:alt', 'twitter:site', 'twitter:creator'
        ];

        tagsToRemove.forEach(tag => {
            this.meta.removeTag(`name="${tag}"`);
            this.meta.removeTag(`property="${tag}"`);
        });

        // Remove article:tag tags
        const allMetaTags = this.meta.getTags('property^="article:tag"');
        allMetaTags?.forEach(tag => {
            this.meta.removeTagElement(tag);
        });
    }

    // Copy Link with rich text
    copyBlogLink(): void {
        const shareText = `${this.getBlogTitle()}\n\n${this.getPlainDescription()}\n\n${this.getFullBlogUrl()}`;

        navigator.clipboard.writeText(shareText).then(() => {
            this.linkCopied = true;
            setTimeout(() => {
                this.linkCopied = false;
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.linkCopied = true;
            setTimeout(() => {
                this.linkCopied = false;
            }, 2000);
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