import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';

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

    blog: any = null;
    slug = '';
    currentLang: 'en' | 'ar' = 'en';
    safeDescription: SafeHtml = '';
    isLoading = true;

    readonly siteName = 'SouqLeader';
    readonly siteUrl = 'https://souqleader.com';

    private sanitizer = inject(DomSanitizer);
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    private meta = inject(Meta);
    private title = inject(Title);

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.currentLang = (params.get('lang') as 'en' | 'ar') || 'en';
            this.slug = params.get('slug') || '';

            if (this.slug) {
                this.loadBlog();
            } else {
                this.isLoading = false;
            }
        });
    }

    ngOnDestroy(): void {
        this.meta.removeTag("property='og:title'");
        this.meta.removeTag("property='og:description'");
        this.meta.removeTag("property='og:image'");
    }

    loadBlog(): void {
        this.http.get<any>(`https://admin.souqleader.com/site/blogs/${this.slug}`)
            .subscribe(res => {
                this.blog = res?.data?.blog;
                this.prepareContent();
                this.isLoading = false;
            });
    }

    prepareContent(): void {
        const html = this.currentLang === 'ar'
            ? this.blog.description_ar
            : this.blog.description_en;

        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(html);

        this.title.setTitle(`${this.getBlogTitle()} | ${this.siteName}`);
    }

    getBlogTitle(): string {
        return this.currentLang === 'ar'
            ? this.blog?.title_ar || this.blog?.title_en
            : this.blog?.title_en;
    }

    getPlainDescription(): string {
        const text = this.currentLang === 'ar'
            ? this.blog?.short_description_ar || this.blog?.description_ar
            : this.blog?.short_description_en || this.blog?.description_en;

        return text?.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }

    getBlogImageUrl(): string {
        return this.blog?.image?.startsWith('http')
            ? this.blog.image
            : `https://admin.souqleader.com/${this.blog.image}`;
    }

    getFullBlogUrl(): string {
        return `${this.siteUrl}/${this.currentLang}/blog-details/${this.slug}`;
    }

    getLocalizedDate(): string {
        return new Date(this.blog?.created_at).toLocaleDateString(
            this.currentLang === 'ar' ? 'ar-SA' : 'en-US',
            { year: 'numeric', month: 'long', day: 'numeric' }
        );
    }

    getFacebookShareUrl(): string {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.getFullBlogUrl())}`;
    }

    getTwitterShareUrl(): string {
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.getFullBlogUrl())}`;
    }

    getLinkedInShareUrl(): string {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.getFullBlogUrl())}`;
    }

    getWhatsAppShareUrl(): string {
        return `https://wa.me/?text=${encodeURIComponent(this.getBlogTitle() + ' ' + this.getFullBlogUrl())}`;
    }
}