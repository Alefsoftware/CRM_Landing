import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-products-details-page',
    imports: [RouterLink, NgClass, NgIf, NavbarStyleTwoComponent, RelatedProductsComponent, DownloadAppStyleOneComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './products-details-page.component.html',
    styleUrls: ['./products-details-page.component.scss']
})
export class ProductsDetailsPageComponent {

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}