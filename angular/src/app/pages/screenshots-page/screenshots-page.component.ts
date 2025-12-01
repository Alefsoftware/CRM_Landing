import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarStyleThreeComponent } from '../../common/navbar-style-three/navbar-style-three.component';
import { ScreenshotsStyleOneComponent } from '../../common/screenshots-style-one/screenshots-style-one.component';
import { ScreenshotsStyleTwoComponent } from '../../common/screenshots-style-two/screenshots-style-two.component';
import { ScreenshotsStyleThreeComponent } from '../../common/screenshots-style-three/screenshots-style-three.component';
import { ScreenshotsStyleFiveComponent } from '../../common/screenshots-style-five/screenshots-style-five.component';
import { ScreenshotsStyleFourComponent } from '../../common/screenshots-style-four/screenshots-style-four.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { ScreenshotsStyleSixComponent } from '../../common/screenshots-style-six/screenshots-style-six.component';
import { DownloadAppStyleOneComponent } from '../../common/download-app-style-one/download-app-style-one.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-screenshots-page',
    imports: [RouterLink, NavbarStyleThreeComponent, ScreenshotsStyleOneComponent, ScreenshotsStyleTwoComponent, ScreenshotsStyleThreeComponent, ScreenshotsStyleFiveComponent, ScreenshotsStyleFourComponent, PartnerComponent, ScreenshotsStyleSixComponent, DownloadAppStyleOneComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './screenshots-page.component.html',
    styleUrls: ['./screenshots-page.component.scss']
})
export class ScreenshotsPageComponent { }