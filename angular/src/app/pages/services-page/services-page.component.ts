import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { FeaturesStyleOneComponent } from '../../common/features-style-one/features-style-one.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-services-page',
    imports: [RouterLink, NavbarStyleTwoComponent, FeaturesStyleOneComponent, DownloadAppStyleOneComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './services-page.component.html',
    styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent { }