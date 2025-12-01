import { Component } from '@angular/core';
import { NavbarStyleThreeComponent } from '../../common/navbar-style-three/navbar-style-three.component';
import { HomefiveBannerComponent } from './homefive-banner/homefive-banner.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { HomefiveAboutComponent } from './homefive-about/homefive-about.component';
import { HomefiveFeaturesComponent } from './homefive-features/homefive-features.component';
import { FeaturesStyleFourComponent } from '../../common/features-style-four/features-style-four.component';
import { ScreenshotsStyleFiveComponent } from '../../common/screenshots-style-five/screenshots-style-five.component';
import { PricingStyleFiveComponent } from '../../common/pricing-style-five/pricing-style-five.component';
import { DownloadAppStyleTwoComponent } from '../../common/download-app-style-two/download-app-style-two.component';
import { FeedbackStyleFourComponent } from '../../common/feedback-style-four/feedback-style-four.component';
import { FreeTrialStyleThreeComponent } from '../../common/free-trial-style-three/free-trial-style-three.component';
import { BlogComponent } from '../../common/blog/blog.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-five',
    imports: [NavbarStyleThreeComponent, HomefiveBannerComponent, PartnerComponent, HomefiveAboutComponent, HomefiveFeaturesComponent, FeaturesStyleFourComponent, ScreenshotsStyleFiveComponent, PricingStyleFiveComponent, DownloadAppStyleTwoComponent, FeedbackStyleFourComponent, FreeTrialStyleThreeComponent, BlogComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-five.component.html',
    styleUrls: ['./home-demo-five.component.scss']
})
export class HomeDemoFiveComponent { }