import { Component } from '@angular/core';
import { NavbarStyleTwoComponent } from '../../common/navbar-style-two/navbar-style-two.component';
import { HomeeightBannerComponent } from './homeeight-banner/homeeight-banner.component';
import { HomeeightFeaturesComponent } from './homeeight-features/homeeight-features.component';
import { HomeeightAboutComponent } from './homeeight-about/homeeight-about.component';
import { FeaturesStyleSevenComponent } from '../../common/features-style-seven/features-style-seven.component';
import { HomeeightScreenshotsComponent } from './homeeight-screenshots/homeeight-screenshots.component';
import { HomeeightIntroComponent } from './homeeight-intro/homeeight-intro.component';
import { FunfactsStyleThreeComponent } from '../../common/funfacts-style-three/funfacts-style-three.component';
import { DownloadAppStyleFiveComponent } from '../../common/download-app-style-five/download-app-style-five.component';
import { FeedbackStyleTwoComponent } from '../../common/feedback-style-two/feedback-style-two.component';
import { PricingStyleSevenComponent } from '../../common/pricing-style-seven/pricing-style-seven.component';
import { HomeeightBlogComponent } from './homeeight-blog/homeeight-blog.component';
import { PartnerComponent } from '../../common/partner/partner.component';
import { FooterStyleFourComponent } from '../../common/footer-style-four/footer-style-four.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';

@Component({
    selector: 'app-home-demo-eight',
    imports: [NavbarStyleTwoComponent, HomeeightBannerComponent, HomeeightFeaturesComponent, HomeeightAboutComponent, FeaturesStyleSevenComponent, HomeeightScreenshotsComponent, HomeeightIntroComponent, FunfactsStyleThreeComponent, DownloadAppStyleFiveComponent, FeedbackStyleTwoComponent, PricingStyleSevenComponent, HomeeightBlogComponent, PartnerComponent, FooterStyleFourComponent, BackToTopComponent],
    templateUrl: './home-demo-eight.component.html',
    styleUrls: ['./home-demo-eight.component.scss']
})
export class HomeDemoEightComponent { }