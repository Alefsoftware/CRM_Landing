import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleThreeComponent } from '../../common/navbar-style-three/navbar-style-three.component';
import { BlogSidebarComponent } from '../../common/blog-sidebar/blog-sidebar.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-blog-left-sidebar-page',
    imports: [RouterLink, NavbarStyleThreeComponent, BlogSidebarComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './blog-left-sidebar-page.component.html',
    styleUrls: ['./blog-left-sidebar-page.component.scss']
})
export class BlogLeftSidebarPageComponent { }