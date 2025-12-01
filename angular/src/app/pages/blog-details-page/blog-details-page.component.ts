import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
        RouterLink,
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

    safeDescription: SafeHtml | null = null;

    private sanitizer = inject(DomSanitizer);


    private route = inject(ActivatedRoute); // ✅ inject route

    ngOnInit(): void {
        this.slug = this.route.snapshot.paramMap.get('slug') || '';
        const url = `https://admin.realstatecrm-development.dev.alefsoftware.com/site/blogs/${this.slug}`;
        console.log('Requesting URL:', url);

        fetch(url)
            .then(response => {
                console.log('Raw response:', response);
                return response.json();
            })
            .then(data => {
                this.blog = data.data.blog || null;
                if (this.blog?.description_en) {
                    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.blog.description_en);
                }


            })
            .catch(error => {
                console.error('Error loading blog:', error);
            });


    }
}
