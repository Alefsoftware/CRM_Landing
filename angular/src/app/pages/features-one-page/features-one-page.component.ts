import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleThreeComponent } from '../../common/navbar-style-three/navbar-style-three.component';
import { FeaturesStyleOneComponent } from '../../common/features-style-one/features-style-one.component';
import { FeaturesStyleFiveComponent } from '../../common/features-style-five/features-style-five.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-features-one-page',
    imports: [RouterLink, NavbarStyleThreeComponent, FeaturesStyleOneComponent, FeaturesStyleFiveComponent, DownloadAppStyleOneComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './features-one-page.component.html',
    styleUrls: ['./features-one-page.component.scss']
})
export class FeaturesOnePageComponent { }