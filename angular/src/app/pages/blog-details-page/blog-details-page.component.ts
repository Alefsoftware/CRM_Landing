import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-blog-details-page',
    standalone: true,
    templateUrl: './blog-details-page.component.html',
    styleUrls: ['./blog-details-page.component.scss']
})
export class BlogDetailsPageComponent implements OnInit, OnDestroy {

    blog: any = null;
    slug = '';
    currentLang: 'en' | 'ar' = 'en';
    safeDescription: SafeHtml = '';
    isLoading = true;

    private siteName = 'SouqLeader';
    private siteUrl = 'https://souqleader.com';
    private sanitizer = inject(DomSanitizer);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private meta = inject(Meta);
    private title = inject(Title);

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.currentLang = (params.get('lang') as 'en' | 'ar') || 'en';
            this.slug = params.get('slug') || '';
            if (this.slug) this.fetchBlog();
        });
    }

    ngOnDestroy(): void {
        this.meta.removeTag("property='og:title'");
    }

    fetchBlog(): void {
        this.isLoading = true;
        this.http.get<any>(`https://admin.souqleader.com/site/blogs/${this.slug}`)
            .subscribe(res => {
                this.blog = res.data.blog;
                this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
                    this.currentLang === 'ar'
                        ? this.blog.description_ar
                        : this.blog.description_en
                );
                this.updateMeta();
                this.isLoading = false;
            });
    }

    updateMeta(): void {
        const title = this.getBlogTitle();
        const desc = this.getPlainDescription();
        const image = this.getBlogImageUrl();
        const url = window.location.href;

        this.title.setTitle(`${title} | ${this.siteName}`);

        this.meta.addTags([
            { name: 'description', content: desc },
            { property: 'og:title', content: title },
            { property: 'og:description', content: desc },
            { property: 'og:image', content: image },
            { property: 'og:url', content: url },
            { property: 'og:type', content: 'article' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: desc },
            { name: 'twitter:image', content: image }
        ]);
    }

    getBlogTitle(): string {
        return this.currentLang === 'ar'
            ? (this.blog?.title_ar || this.blog?.title_en)
            : this.blog?.title_en;
    }

    getPlainDescription(): string {
        const html = this.currentLang === 'ar'
            ? this.blog?.description_ar
            : this.blog?.description_en;

        return html?.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }

    getBlogImageUrl(): string {
        return `https://admin.souqleader.com/${this.blog?.image}`;
    }

    getLocalizedDate(): string {
        return new Date(this.blog.created_at).toLocaleDateString(
            this.currentLang === 'ar' ? 'ar-SA' : 'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
    }

    getFacebookShareUrl(): string {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    }

    getTwitterShareUrl(): string {
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
    }

    getLinkedInShareUrl(): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    getWhatsAppShareUrl(): string {
        return `https://wa.me/?text=${encodeURIComponent(this.getBlogTitle() + '\n' + window.location.href)}`;
    }

    openSocialWindow(event: Event, url: string, platform: string): void {
        event.preventDefault();
        window.open(url, 'share', 'width=600,height=500');
    }
}
