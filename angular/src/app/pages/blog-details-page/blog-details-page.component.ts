import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-blog-details-page',
    standalone: true,
    imports: [
        RouterModule, // ✅ important
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
    slug = '';
    currentLang: 'en' | 'ar' = 'en';

    safeDescription: SafeHtml | null = null;

    private route = inject(ActivatedRoute);
    private sanitizer = inject(DomSanitizer);

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            this.currentLang = (params.get('lang') as 'en' | 'ar') || 'en';
            this.slug = params.get('slug') || '';

            const url = `https://admin.souqleader.com/site/blogs/${this.slug}`;
            console.log('Requesting URL:', url);

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.blog = data.data.blog || null;

                    const description =
                        this.currentLang === 'ar'
                            ? this.blog?.description_ar
                            : this.blog?.description_en;

                    if (description) {
                        this.safeDescription =
                            this.sanitizer.bypassSecurityTrustHtml(description);
                    }
                })
                .catch(err => {
                    console.error('Error loading blog:', err);
                });

        });
    }
}
