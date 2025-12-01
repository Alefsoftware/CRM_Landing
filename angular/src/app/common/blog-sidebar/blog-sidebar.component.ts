import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        HttpClientModule // ✅ Use this instead of provideHttpClient
    ],
    templateUrl: './blog-sidebar.component.html',
    styleUrls: ['./blog-sidebar.component.scss']
})
export class BlogSidebarComponent implements OnInit {
    popularPosts: any[] = [];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.loadPopularPosts();
    }

    loadPopularPosts() {
        const url = 'https://admin.realstatecrm-development.dev.alefsoftware.com/site/blogs/crm-real-estate-companies';
        this.http.get<any>(url).subscribe({
            next: res => {
                if (res.status && res.data?.other_blogs) {
                    this.popularPosts = res.data.other_blogs;
                }
            },
            error: err => {
                console.error('HTTP Error:', err);
            }
        });
    }
}
