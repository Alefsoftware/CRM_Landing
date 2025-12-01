import { Component } from '@angular/core';
import { NavbarStyleFourComponent } from '../../common/navbar-style-four/navbar-style-four.component';
import { HomesixBannerComponent } from './homesix-banner/homesix-banner.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { HomesixAboutComponent } from './homesix-about/homesix-about.component';
import { FunfactsStyleOneComponent } from '../../common/funfacts-style-one/funfacts-style-one.component';
import { FeaturesStyleFiveComponent } from '../../common/features-style-five/features-style-five.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { ScreenshotsStyleSixComponent } from '../../common/screenshots-style-six/screenshots-style-six.component';
import { FeedbackStyleFiveComponent } from '../../common/feedback-style-five/feedback-style-five.component';
import { FreeTrialStyleThreeComponent } from '../../common/free-trial-style-three/free-trial-style-three.component';
import { PricingStyleTwoComponent } from '../../common/pricing-style-two/pricing-style-two.component';
import { BlogComponent } from '../../common/blog/blog.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-six',
    imports: [NavbarStyleFourComponent, HomesixBannerComponent, PartnerComponent, HomesixAboutComponent, FunfactsStyleOneComponent, FeaturesStyleFiveComponent, DownloadAppStyleTwoComponent, ScreenshotsStyleSixComponent, FeedbackStyleFiveComponent, FreeTrialStyleThreeComponent, PricingStyleTwoComponent, BlogComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-six.component.html',
    styleUrls: ['./home-demo-six.component.scss']
})
export class HomeDemoSixComponent { }