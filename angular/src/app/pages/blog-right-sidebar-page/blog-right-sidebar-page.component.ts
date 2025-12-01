import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-blog-right-sidebar-page',
    imports: [RouterLink, NavbarStyleTwoComponent, BlogSidebarComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './blog-right-sidebar-page.component.html',
    styleUrls: ['./blog-right-sidebar-page.component.scss']
})
export class BlogRightSidebarPageComponent { }