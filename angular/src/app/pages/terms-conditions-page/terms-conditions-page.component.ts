import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleThreeComponent } from '../../common/navbar-style-three/navbar-style-three.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarStyleTwoComponent } from "../../common/navbar-style-two/navbar-style-two.component";

@Component({
    selector: 'app-terms-conditions-page',
    imports: [RouterLink, NavbarStyleThreeComponent, DownloadAppStyleTwoComponent, FooterStyleFourComponent, BackToTopComponent, NavbarStyleTwoComponent],
    templateUrl: './terms-conditions-page.component.html',
    styleUrls: ['./terms-conditions-page.component.scss']
})
export class TermsConditionsPageComponent { }