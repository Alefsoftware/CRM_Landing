import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-blog-grid-page',
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterLink,
        NavbarStyleTwoComponent,
        FooterStyleFourComponent,
        BackToTopComponent
    ],
    templateUrl: './blog-grid-page.component.html',
    styleUrls: ['./blog-grid-page.component.scss']
})
export class BlogGridPageComponent implements OnInit {
    blogs: any[] = [];
    currentPage = 1;
    lastPage = 1;
    paginationLinks: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchBlogs(this.currentPage);
    }

    fetchBlogs(page: number): void {
        console.log('Fetching blogs for page:', page); // ✅ Check console
        this.http.get<any>(`https://admin.realstatecrm-development.dev.alefsoftware.com/site/blogs?page=${page}`)
            .subscribe(res => {
                console.log('API Response:', res); // ✅ Check console

                if (res.status && res.data) {
                    this.blogs = res.data.data;
                    this.currentPage = res.data.current_page;
                    this.lastPage = res.data.last_page;
                    this.paginationLinks = res.data.links;
                }
            });
    }

    goToPage(link: any): void {
        if (link.url) {
            const url = new URL(link.url);
            const page = url.searchParams.get('page');
            console.log('Clicked page:', page); // ✅ Check console
            if (page) {
                this.fetchBlogs(Number(page));
            }
        }
    }
}
